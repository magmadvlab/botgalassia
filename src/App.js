import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { transportFAQ_IT } from './faq/it/transportFAQ_IT';

// Importa le FAQ
const ALL_FAQ_IT = {
  trasporti: transportFAQ_IT,
  piscina: {
    title: 'Piscina',
    keywords: ['piscina', 'nuoto', 'orari piscina'],
    questions: {
      'orari piscina': {
        answer: 'La piscina è aperta tutti i giorni dalle 9:00 alle 20:00. Per i bambini sotto i 12 anni è necessaria la presenza di un adulto.',
        tags: ['piscina', 'orari']
      }
    }
  },
  sci: {
    title: 'Sci',
    keywords: ['sci', 'piste', 'skipass'],
    questions: {
      'piste': {
        answer: 'Le piste sono raggiungibili a piedi dall\'hotel in 5 minuti. Abbiamo accesso diretto alle piste blu e rosse.',
        tags: ['sci', 'piste']
      }
    }
  }
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
    
    // Cerca nelle FAQ
    for (const [categoryKey, category] of Object.entries(ALL_FAQ_IT)) {
      // Controlla le keywords della categoria
      if (category.keywords.some(keyword => processedInput.includes(keyword))) {
        // Cerca la domanda più pertinente nella categoria
        for (const [questionKey, data] of Object.entries(category.questions)) {
          if (processedInput.includes(questionKey.toLowerCase()) || 
              data.tags.some(tag => processedInput.includes(tag))) {
            return {
              title: category.title,
              content: data.answer
            };
          }
        }
        // Se trova la categoria ma non una domanda specifica
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
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white p-4">
        <h1 className="text-2xl font-bold">Hotel Galassia</h1>
        <p className="text-lg">Assistente Virtuale</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-[#B8860B] text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              {message.title && (
                <div className="font-bold text-lg mb-1">{message.title}</div>
              )}
              <div className="text-base">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-base"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-4 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
