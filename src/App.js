import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import logo from './logo-galassia-prato-nevoso.png';
import Fuse from 'fuse.js';
import { checkinFAQ_IT } from './faq/it/checkin_it';
import { checkoutFAQ_IT } from './faq/it/checkout_it';
import { activitiesFAQ_IT } from './faq/it/activities_it';
import { attractionsFAQ_IT } from './faq/it/attractions_it';
import { skiFAQ_IT } from './faq/it/ski_it';
import { techServicesFAQ_IT } from './faq/it/tech_services_it';
import { transportFAQ_IT } from './faq/it/transport_it';
import { wellnessFAQ_IT } from './faq/it/wellness_it';

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Benvenuto! Come posso aiutarti?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const processedInput = userInput.toLowerCase().trim();

    const categoryMap = {
      'check-in': checkinFAQ_IT,
      'check-out': checkoutFAQ_IT,
      'attività': activitiesFAQ_IT,
      'attrazioni': attractionsFAQ_IT,
      'sci': skiFAQ_IT,
      'servizi tecnici': techServicesFAQ_IT,
      'trasporti': transportFAQ_IT,
      'benessere': wellnessFAQ_IT,
    };

    const synonyms = {
      'check-in': ['checkin', 'inizio soggiorno', 'entrata'],
      'check-out': ['checkout', 'fine soggiorno', 'uscita'],
      'attività': ['escursioni', 'sport', 'attività'],
      'attrazioni': ['cosa vedere', 'luoghi', 'attrazioni'],
      'sci': ['piste', 'sci', 'neve', 'snowboard'],
      'servizi tecnici': ['tecnologia', 'wifi', 'internet', 'connessione', 'servizi tecnologici'],
      'trasporti': ['trasporto', 'bus', 'navetta', 'shuttle', 'come arrivare'],
      'benessere': ['spa', 'wellness', 'benessere', 'massaggi', 'relax'],
    };

    let expandedQuery = processedInput;
    let selectedCategory = null;

    // Trova la categoria corretta
    Object.entries(synonyms).forEach(([category, alternatives]) => {
      alternatives.forEach((alt) => {
        const regex = new RegExp(`\\b${alt}\\b`, 'gi');
        if (regex.test(processedInput)) {
          expandedQuery = expandedQuery.replace(regex, category);
          selectedCategory = categoryMap[category];
        }
      });
    });

    if (!selectedCategory) {
      return [
        {
          title: 'Info',
          content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
        },
      ];
    }

    // Prepara i dati delle FAQ per la ricerca
    const faqArray = Object.entries(selectedCategory.questions).map(([questionKey, data]) => ({
      category: selectedCategory.title,
      question: questionKey,
      answer: data.answer,
      tags: data.tags || [],
    }));

    const fuse = new Fuse(faqArray, {
      keys: [
        { name: 'tags', weight: 0.7 },
        { name: 'question', weight: 0.3 },
      ],
      threshold: 0.2,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });

    const results = fuse.search(expandedQuery);

    if (results.length > 0) {
      return results.slice(0, 1).map((result) => ({
        title: result.item.category,
        content: result.item.answer,
      }));
    }

    fetch('/log-missing-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userInput,
        timestamp: new Date().toISOString(),
      }),
    });

    return [
      {
        title: 'Info',
        content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
      },
    ];
  };

  const handleFeedback = (index, feedbackType, userInput) => {
    console.log(`Feedback ricevuto per il messaggio ${index}: ${feedbackType}`);
    fetch('/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userInput,
        feedback: feedbackType,
        timestamp: new Date().toISOString(),
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);

    const botMessages = response.map((res) => ({
      type: 'bot',
      title: res.title,
      content: res.content,
    }));

    setMessages([...messages, userMessage, ...botMessages]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="bg-white p-4 border-b shadow-sm">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <img src={logo} alt="Hotel Galassia Logo" className="w-32 mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-[#B8860B]">Hotel Galassia</h1>
          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="text-[#B8860B] text-lg">★</span>
            <span className="text-[#B8860B] text-lg">★</span>
            <span className="text-[#B8860B] text-lg">★</span>
          </div>
          <div className="text-[#B8860B] text-sm font-medium tracking-wide mb-1">PRATO NEVOSO</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-md'
              }`}
            >
              {message.title && (
                <div className="font-bold text-base sm:text-lg mb-1">{message.title}</div>
              )}
              <div className="text-sm sm:text-base">{message.content}</div>

              {message.type === 'bot' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleFeedback(index, 'positive', message.content)}
                    className="flex items-center text-[#B8860B] hover:opacity-75"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleFeedback(index, 'negative', message.content)}
                    className="flex items-center text-red-500 hover:opacity-75"
                  >
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="border-t bg-white p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-3 sm:p-4 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
