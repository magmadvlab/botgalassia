import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, Clock, Mountain, MapPin, Book } from 'lucide-react';

// Constants
const SUPPORTED_LANGUAGES = {
  it: {
    welcome: 'Benvenuto! Come posso aiutarti?',
    defaultResponse: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
    inputPlaceholder: 'Scrivi un messaggio...',
    buttonLabels: {
      checkin: 'Check-in',
      ski: 'Sci',
      pool: 'Piscina',
      services: 'Servizi'
    }
  },
  en: {
    welcome: 'Welcome! How can I help you?',
    defaultResponse: 'I\'m sorry, I didn\'t understand. Could you rephrase that?',
    inputPlaceholder: 'Type a message...',
    buttonLabels: {
      checkin: 'Check-in',
      ski: 'Ski',
      pool: 'Pool',
      services: 'Services'
    }
  }
};

const COMMON_TERMS = {
  synonyms: {
    'orario': ['ora', 'tempo', 'quando'],
    'piscina': ['nuoto', 'bagno'],
    'ski': ['sciare', 'neve', 'piste']
    // Add more synonyms as needed
  }
};

const QUESTION_PATTERNS = {
  time: ['quando', 'orario', 'ora'],
  location: ['dove', 'posto', 'luogo'],
  how: ['come', 'modo', 'maniera']
};

const RELATED_CATEGORIES = {
  checkin: {
    related: ['services', 'rooms'],
    weight: 0.5
  },
  ski: {
    related: ['activities', 'transport'],
    weight: 0.5
  }
};

const ALL_FAQ_IT = {
  reception: {
    title: 'Reception',
    keywords: ['orario', 'check-in', 'check-out'],
    questions: {
      'Qual è l\'orario del check-in?': {
        answer: 'Il check-in è disponibile dalle 15:00 alle 22:00.',
        tags: ['orario', 'check-in']
      }
      // Add more questions as needed
    }
  }
  // Add more categories as needed
};

// Funzioni di utilità per il preprocessamento e logging
const preprocessInput = (input) => {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // rimuove accenti
    .replace(/[^\w\s]/g, ' ') // rimuove punteggiatura
    .replace(/\s+/g, ' ')     // normalizza spazi
    .split(' ')               // divide in parole
    .filter(word => word.length > 2) // rimuove parole troppo corte
    .join(' ');
};

// Funzione per controllare i sinonimi
const checkSynonyms = (word) => {
  for (const [mainTerm, synonyms] of Object.entries(COMMON_TERMS.synonyms)) {
    if (word === mainTerm || synonyms.includes(word)) {
      return mainTerm;
    }
  }
  return word;
};

// Sistema di logging per debug
const logInteraction = (input, processedInput, response, score) => {
  const logData = {
    timestamp: new Date().toISOString(),
    originalInput: input,
    processedInput: processedInput,
    response: {
      title: response.title,
      content: response.content
    },
    score: score,
  };
  console.log('Chat Interaction:', logData);
  // Salva in localStorage per analisi future
  const logs = JSON.parse(localStorage.getItem('chatLogs') || '[]');
  logs.push(logData);
  localStorage.setItem('chatLogs', JSON.stringify(logs.slice(-100))); // Mantiene ultimi 100 log
};

// Sistema di feedback
const saveFeedback = (feedback) => {
  const existingFeedback = JSON.parse(localStorage.getItem('chatFeedback') || '[]');
  existingFeedback.push({
    ...feedback,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('chatFeedback', JSON.stringify(existingFeedback));
};

// Funzione per calcolare il punteggio basato sul feedback storico
const getFeedbackScore = (input, category) => {
  const feedback = JSON.parse(localStorage.getItem('chatFeedback') || '[]');
  const relevantFeedback = feedback.filter(f => 
    f.processedInput === preprocessInput(input) || 
    f.category === category
  );
  
  if (relevantFeedback.length === 0) return 0;
  
  return relevantFeedback.reduce((score, f) => {
    return score + (f.helpful ? 1 : -0.5);
  }, 0);
};

// Funzione per trovare risposte alternative basate sul feedback
const findAlternativeResponse = (input, faq) => {
  const feedback = JSON.parse(localStorage.getItem('chatFeedback') || '[]');
  const similarQuestions = feedback
    .filter(f => f.helpful)
    .filter(f => {
      const similarity = calculateSimilarity(
        preprocessInput(input), 
        preprocessInput(f.originalInput)
      );
      return similarity > 0.7; // soglia di similarità
    });
    
  if (similarQuestions.length > 0) {
    // Trova la risposta più popolare tra le domande simili
    return similarQuestions.reduce((prev, current) => 
      prev.score > current.score ? prev : current
    ).response;
  }
  return null;
};

// Funzione per calcolare la similarità tra stringhe
const calculateSimilarity = (str1, str2) => {
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

const App = () => {
  const detectLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES[browserLang] ? browserLang : 'it';
  };

  const [currentLang, setCurrentLang] = useState(detectLanguage());
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: SUPPORTED_LANGUAGES[currentLang].welcome,
    }
  ]);
  const [input, setInput] = useState('');
  const [conversationContext, setConversationContext] = useState({
    lastCategory: null,
    lastQuestion: null
  });
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const processedInput = preprocessInput(userInput);
    const inputWords = processedInput.split(' ').map(word => checkSynonyms(word));
    const faq = ALL_FAQ_IT;
    let bestMatch = null;
    let bestScore = 0;
    let matchDetails = {};

    // Controlla prima per risposte alternative dal feedback
    const alternativeResponse = findAlternativeResponse(userInput, faq);
    if (alternativeResponse) {
      return alternativeResponse;
    }

    for (const [category, categoryData] of Object.entries(faq)) {
      // Verifica pattern di domanda comuni
      let patternScore = 0;
      for (const [patternType, patterns] of Object.entries(QUESTION_PATTERNS)) {
        if (patterns.some(pattern => processedInput.includes(pattern))) {
          patternScore += 1;
        }
      }

      // Verifica relazioni tra categorie
      let relationScore = 0;
      if (conversationContext.lastCategory) {
        const relations = RELATED_CATEGORIES[category];
        if (relations && relations.related.includes(conversationContext.lastCategory)) {
          relationScore = relations.weight;
        }
      }

      // Verifica keywords della categoria
      const categoryScore = categoryData.keywords?.some(keyword => 
        inputWords.includes(checkSynonyms(keyword.toLowerCase()))
      ) ? 2 : 0;

      for (const [question, data] of Object.entries(categoryData.questions)) {
        let score = categoryScore + patternScore + relationScore;
        const questionWords = preprocessInput(question).split(' ').map(word => checkSynonyms(word));
        const { tags = [] } = data;

        // Corrispondenza esatta
        if (processedInput === preprocessInput(question)) {
          return {
            title: categoryData.title,
            content: data.answer,
            score: 100,
            category
          };
        }

        // Punteggio per tags
        const matchingTags = tags.filter(tag => 
          inputWords.includes(checkSynonyms(tag.toLowerCase()))
        );
        score += matchingTags.length * 3;

        // Punteggio per parole della domanda
        const matchingWords = inputWords.filter(word => 
          questionWords.includes(word)
        );
        score += matchingWords.length * 2;

        // Aggiungi punteggio dal feedback storico
        score += getFeedbackScore(userInput, category);

        if (score > bestScore) {
          bestScore = score;
          bestMatch = {
            title: categoryData.title,
            content: data.answer,
            score,
            category
          };
          matchDetails = {
            category,
            matchingTags,
            matchingWords,
            patternScore,
            relationScore
          };
        }
      }
    }

    // Log dell'interazione per debug
    logInteraction(userInput, processedInput, bestMatch || {
      title: "Reception",
      content: SUPPORTED_LANGUAGES[currentLang].defaultResponse
    }, bestScore);

    // Ritorna il match migliore solo se ha un punteggio sufficiente
    if (bestMatch && bestScore > 3) {
      setConversationContext(prev => ({
        ...prev,
        lastCategory: bestMatch.category,
        lastQuestion: userInput
      }));
      return bestMatch;
    }

    return {
      title: "Reception",
      content: SUPPORTED_LANGUAGES[currentLang].defaultResponse
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);
    const botMessage = {
      type: 'bot',
      title: response.title,
      content: response.content,
      id: Date.now(), // Per identificare univocamente il messaggio per il feedback
      score: response.score
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleFeedback = (messageId, isHelpful) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    saveFeedback({
      originalInput: input,
      processedInput: preprocessInput(input),
      response: {
        title: message.title,
        content: message.content
      },
      helpful: isHelpful,
      category: conversationContext.lastCategory
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Hotel Galassia</h1>
        <p className="text-sm">Assistente Virtuale</p>
      </div>

      {/* Area messaggi con feedback */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-[#B8860B] text-white'
                  : 'bg-white shadow-sm border border-gray-100'
              }`}
            >
              {message.title && (
                <div className="font-bold mb-1">{message.title}</div>
              )}
              <div className="whitespace-pre-line">{message.content}</div>
              {message.type === 'bot' && message.id && (
                <div className="flex gap-2 mt-2 justify-end">
                  <button 
                    onClick={() => handleFeedback(message.id, true)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(message.id, false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-white p-4 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SUPPORTED_LANGUAGES[currentLang].inputPlaceholder}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-2 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
           <button
  type="submit"
  className="bg-[#B8860B] text-white p-2 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
>
  <Send className="w-5 h-5" />
</button>          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
