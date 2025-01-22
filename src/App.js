import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import logo from './logo-galassia-prato-nevoso.png';

// Importa le FAQ dalle categorie esistenti
import { transportFAQ_IT } from './faq/it/transport_it';
import { wellnessFAQ_IT } from './faq/it/wellness_it';
import { skiFAQ_IT } from './faq/it/ski_it';
import { petsFAQ_IT } from './faq/it/pets_it';
import { checkinFAQ_IT } from './faq/it/checkin_it';
import { diningFAQ_IT } from './faq/it/dining_it';
import { emergencyFAQ_IT } from './faq/it/emergency_it';
import { entertainmentFAQ_IT } from './faq/it/entertainment_it';
import { techServicesFAQ_IT } from './faq/it/tech_services_it';
import { activitiesFAQ_IT } from './faq/it/activities_it';
import { attractionsFAQ_IT } from './faq/it/attractions_it';

// Combina tutte le FAQ in un oggetto
const ALL_FAQ_IT = {
  trasporti: transportFAQ_IT,
  wellness: wellnessFAQ_IT,
  sci: skiFAQ_IT,
  pets: petsFAQ_IT,
  checkin: checkinFAQ_IT,
  dining: diningFAQ_IT,
  emergency: emergencyFAQ_IT,
  entertainment: entertainmentFAQ_IT,
  techServices: techServicesFAQ_IT,
  activities: activitiesFAQ_IT,
  attractions: attractionsFAQ_IT
};

const App = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Benvenuto! Come posso aiutarti?',
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const processedInput = userInput.toLowerCase().trim();
    
    for (const [categoryKey, category] of Object.entries(ALL_FAQ_IT)) {
      if (category.keywords.some(keyword => processedInput.includes(keyword))) {
        for (const [questionKey, data] of Object.entries(category.questions)) {
          if (processedInput.includes(questionKey.toLowerCase()) || 
              data.tags.some(tag => processedInput.includes(tag))) {
            return {
              title: category.title,
              content: data.answer
            };
          }
        }
        const firstQuestion = Object.values(category.questions)[0];
        return {
          title: category.title,
          content: firstQuestion.answer
        };
      }
    }
    
    return {
      title: 'Info',
      content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?'
    };
  };

  const handleFeedback = (index, feedbackType) => {
    console.log(`Feedback ricevuto per il messaggio ${index}: ${feedbackType}`);
    // Qui potresti salvare il feedback in un database o file per ulteriori analisi
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);
    const botMessage = {
      type: 'bot',
      title: response.title,
      content: response.content
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="bg-white p-4 border-b shadow-sm">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Logo Section */}
          <img src={logo} alt="Hotel Galassia Logo" className="w-32 mb-3" />

          {/* Hotel Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#B8860B]">
            Hotel Galassia
          </h1>

          {/* Stars */}
          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="text-[#B8860B] text-lg">★</span>
            <span className="text-[#B8860B] text-lg">★</span>
            <span className="text-[#B8860B] text-lg">★</span>
          </div>

          {/* Location */}
          <div className="text-[#B8860B] text-sm font-medium tracking-wide mb-1">
            PRATO NEVOSO
          </div>
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
                message.type === 'user'
                  ? 'bg-[#B8860B] text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              {message.title && (
                <div className="font-bold text-base sm:text-lg mb-1">{message.title}</div>
              )}
              <div className="text-sm sm:text-base">{message.content}</div>

              {message.type === 'bot' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleFeedback(index, 'positive')}
                    className="flex items-center text-[#B8860B] hover:opacity-75"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleFeedback(index, 'negative')}
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
