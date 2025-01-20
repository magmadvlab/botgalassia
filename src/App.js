import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

// Costanti (meglio usare const per le costanti)
const SUPPORTED_LANGUAGES = {
  it: {
    welcome: 'Benvenuto! Come posso aiutarti?',
    defaultResponse: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
    inputPlaceholder: 'Scrivi un messaggio...',
  },
  en: {
    welcome: 'Welcome! How can I help you?',
    defaultResponse: "I'm sorry, I didn't understand. Could you rephrase that?",
    inputPlaceholder: 'Type a message...',
  },
};

const COMMON_TERMS = {
  synonyms: {
    'orario': ['ora', 'tempo', 'quando'],
    'piscina': ['nuoto', 'bagno'],
    'sci': ['sciare', 'neve', 'piste'], // Corretto "ski" in "sci" per coerenza con l'italiano
  },
};

const QUESTION_PATTERNS = {
  time: ['quando', 'orario', 'ora'],
  location: ['dove', 'posto', 'luogo'],
  how: ['come', 'modo', 'maniera'],
};

const RELATED_CATEGORIES = {
  checkin: {
    related: ['services', 'rooms'],
    weight: 0.5,
  },
  ski: {
    related: ['activities', 'transport'],
    weight: 0.5,
  },
};

const ALL_FAQ_IT = {
  reception: {
    title: 'Reception',
    keywords: ['orario', 'check-in', 'check-out'],
    questions: {
      'Qual è l\'orario del check-in?': {
        answer: 'Il check-in è disponibile dalle 15:00 alle 22:00.',
        tags: ['orario', 'check-in'],
      },
      // Aggiungi altre domande qui
    },
  },
  // Aggiungi altre categorie qui
};

// Funzioni di utilità
const preprocessInput = (input) => {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Rimuove accenti
    .replace(/[^\w\s]/g, ' ')     // Rimuove punteggiatura
    .replace(/\s+/g, ' ')         // Normalizza spazi multipli
    .split(' ')
    .filter(word => word.length > 2)
    .join(' ');
};

const checkSynonyms = (word) => {
  for (const [mainTerm, synonyms] of Object.entries(COMMON_TERMS.synonyms)) {
    if (word === mainTerm || synonyms.includes(word)) {
      return mainTerm;
    }
  }
  return word;
};

const logInteraction = (input, processedInput, response, score) => {
  const logData = {
    timestamp: new Date().toISOString(),
    originalInput: input,
    processedInput,
    response,
    score,
  };
  console.log('Chat Interaction:', logData);
  // Log in localStorage (implementazione omessa per brevità)
};

const getFeedbackScore = (input, category) => {
    // Implementazione del feedback omessa per brevità
    return 0; // Placeholder
};

const findAlternativeResponse = (input, faq) => {
    // Implementazione ricerca alternative omessa per brevità
    return null; // Placeholder
};

const calculateSimilarity = (str1, str2) => {
    // Implementazione similarità omessa per brevità
    return 0; // Placeholder
};


const App = () => {
    const detectLanguage = () => {
        const browserLang = navigator.language.split('-')[0];
        return SUPPORTED_LANGUAGES[browserLang] ? browserLang : 'it';
    };

    const [currentLang, setCurrentLang] = useState(detectLanguage());
    const [messages, setMessages] = useState([{ type: 'bot', content: SUPPORTED_LANGUAGES[currentLang].welcome }]);
    const [input, setInput] = useState('');
    const [conversationContext, setConversationContext] = useState({ lastCategory: null, lastQuestion: null });
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  const findBestResponse = (userInput) => {
    // ... (la logica di findBestResponse rimane simile, ma più pulita)
    const processedInput = preprocessInput(userInput);
    const inputWords = processedInput.split(' ').map(checkSynonyms);
    let bestMatch = null;
    let bestScore = 0;

        const alternativeResponse = findAlternativeResponse(userInput, ALL_FAQ_IT);
        if (alternativeResponse) return alternativeResponse;

    for (const [category, categoryData] of Object.entries(ALL_FAQ_IT)) {
        // ... (calcolo del punteggio come prima)
        for (const [question, data] of Object.entries(categoryData.questions)) {
            let score = 0;
            // ... (calcolo del punteggio)

            if (score > bestScore) {
                bestScore = score;
                bestMatch = { title: categoryData.title, content: data.answer, category };
            }
        }
    }

        logInteraction(userInput, processedInput, bestMatch || { title: "Reception", content: SUPPORTED_LANGUAGES[currentLang].defaultResponse }, bestScore);

    if (bestMatch && bestScore > 3) { // Soglia minima per considerare una risposta valida
      setConversationContext(prev => ({ ...prev, lastCategory: bestMatch.category, lastQuestion: userInput }));
      return bestMatch;
    }

    return { title: "Reception", content: SUPPORTED_LANGUAGES[currentLang].defaultResponse };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);
    const botMessage = { type: 'bot', title: response.title, content: response.content, id: Date.now() };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleFeedback = (messageId, isHelpful) => {
      // Implementazione del feedback omessa per brevità
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Hotel Galassia</h1>
        <p className="text-sm">Assistente Virtuale</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-3 rounded-lg ${message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm border border-gray-100'}`}>
              {message.title && <div className="font-bold mb-1">{message.title}</div>}
              <div className="whitespace-pre-line">{message.content}</div>
              {message.type === 'bot' && message.id && (
                <div className="flex gap-2 mt-2 justify-end">
                  <button onClick={() => handleFeedback(message.id, true)} className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleFeedback(message.id, false)} className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
