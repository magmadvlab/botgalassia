import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

// Constants per le FAQ
const ALL_FAQ_IT = {
  reception: {
    title: 'Reception',
    keywords: ['orario', 'check-in', 'check-out'],
    questions: {
      'Qual è l\'orario del check-in?': {
        answer: 'Il check-in è disponibile dalle 15:00 alle 22:00.',
        tags: ['orario', 'check-in']
      },
      'A che ora è il check-out?': {
        answer: 'Il check-out deve essere effettuato entro le 10:00.',
        tags: ['orario', 'check-out']
      }
    }
  },
  ski: {
    title: 'Sci',
    keywords: ['sci', 'piste', 'skipass'],
    questions: {
      'Come raggiungo le piste da sci?': {
        answer: 'Le piste sono raggiungibili a piedi dall\'hotel in 5 minuti.',
        tags: ['sci', 'piste']
      },
      'Dove posso acquistare lo skipass?': {
        answer: 'Lo skipass può essere acquistato direttamente alla reception dell\'hotel.',
        tags: ['sci', 'skipass']
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
    for (const category of Object.values(ALL_FAQ_IT)) {
      for (const [question, data] of Object.entries(category.questions)) {
        if (processedInput.includes(question.toLowerCase()) ||
            data.tags.some(tag => processedInput.includes(tag))) {
          return {
            title: category.title,
            content: data.answer
          };
        }
      }
    }
    
    // Risposta default se non trova match
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
    <div className="w-full max-w-2xl mx-auto h-screen flex flex-col bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Hotel Galassia</h1>
        <p className="text-sm">Assistente Virtuale</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-white p-4 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-2 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
