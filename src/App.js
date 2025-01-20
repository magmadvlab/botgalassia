import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, MapPin, Mountain, Book } from 'lucide-react';
import { ALL_FAQ_IT, ALL_KEYWORDS_IT } from './faq/it/index.js';

// Configurazione lingue supportate
const SUPPORTED_LANGUAGES = {
  'it': {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    welcome: "Benvenuto nel chatbot dell'Hotel Galassia! Come posso aiutarti?",
    inputPlaceholder: "Fai una domanda...",
    defaultResponse: "Mi dispiace, non ho trovato una risposta specifica. Contatta la reception: 0174 334183",
    buttonLabels: {
      checkin: "Check-in/out",
      ski: "Info Sci",
      pool: "Piscina",
      services: "Servizi"
    }
  }
};

const preprocessInput = (input) => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, '') // rimuove punteggiatura
    .replace(/\s+/g, ' ');  // normalizza spazi multipli
};

const App = () => {
  // Rileva la lingua del browser
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
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    const faq = ALL_FAQ_IT;
    let bestMatch = null;
    let bestScore = 0;
    
    // Dividi l'input in parole
    const inputWords = input.split(/\s+/);
    
    // Cerca nelle FAQ della lingua corrente
    for (const [category, categoryData] of Object.entries(faq)) {
      // Controlla prima le keywords della categoria
      const categoryKeywords = categoryData.keywords || [];
      const hasKeyword = categoryKeywords.some(keyword => 
        input.includes(keyword.toLowerCase())
      );

      for (const [question, data] of Object.entries(categoryData.questions)) {
        let score = 0;
        const questionLower = question.toLowerCase();
        const { tags = [], answer = '' } = data;
        
        // Controlla corrispondenza esatta
        if (input === questionLower) {
          return {
            title: categoryData.title,
            content: data.answer
          };
        }

        // Punteggio per parole chiave della categoria
        if (hasKeyword) score += 1;

        // Punteggio per tags
        const matchingTags = tags.filter(tag => 
          input.includes(tag.toLowerCase())
        );
        score += matchingTags.length * 2;

        // Punteggio per parole della domanda
        const questionWords = questionLower.split(/\s+/);
        const matchingWords = inputWords.filter(word => 
          questionWords.includes(word)
        );
        score += matchingWords.length;

        // Se questo match è migliore dei precedenti, salvalo
        if (score > bestScore) {
          bestScore = score;
          bestMatch = {
            title: categoryData.title,
            content: data.answer
          };
        }
      }
    }

    // Se abbiamo trovato un match con score > 0, usalo
    if (bestMatch && bestScore > 1) {
      return bestMatch;
    }

    // Risposta di default nella lingua corrente
    return {
      title: "Reception",
      content: SUPPORTED_LANGUAGES[currentLang].defaultResponse
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const processedInput = preprocessInput(input);
    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(processedInput);
    const botMessage = {
      type: 'bot',
      title: response.title,
      content: response.content
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
      {/* Header con logo e branding */}
      <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo SVG inline */}
            <svg viewBox="0 0 100 100" className="w-10 h-10" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="5"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="5"/>
              <circle cx="85" cy="50" r="5" fill="currentColor"/>
              <circle cx="15" cy="50" r="5" fill="currentColor"/>
            </svg>
            <div>
              <h2 className="text-xl font-bold">Hotel Galassia</h2>
              <div className="flex items-center">
                <span className="text-sm tracking-wider font-light">PRATO NEVOSO</span>
                <div className="flex ml-2">
                  <span className="text-yellow-300">★</span>
                  <span className="text-yellow-300">★</span>
                  <span className="text-yellow-300">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area messaggi */}
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
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Quick buttons */}
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          <QuickButton 
            icon={<Clock />} 
            text={SUPPORTED_LANGUAGES[currentLang].buttonLabels.checkin} 
            onClick={() => setInput('Orari check-in')} 
          />
          <QuickButton 
            icon={<Mountain />} 
            text={SUPPORTED_LANGUAGES[currentLang].buttonLabels.ski} 
            onClick={() => setInput('Come arrivo alle piste?')} 
          />
          <QuickButton 
            icon={<MapPin />} 
            text={SUPPORTED_LANGUAGES[currentLang].buttonLabels.pool} 
            onClick={() => setInput('Dove è la piscina?')} 
          />
          <QuickButton 
            icon={<Book />} 
            text={SUPPORTED_LANGUAGES[currentLang].buttonLabels.services} 
            onClick={() => setInput('Quali servizi offrite?')} 
          />
        </div>
      </div>
    </div>
  );
};

const QuickButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B8860B] whitespace-nowrap"
  >
    {icon}
    <span>{text}</span>
  </button>
);

export default App;
