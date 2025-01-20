import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

const App = () => {
  console.log('App is rendering'); // Questo ci aiuterà a verificare se il componente viene caricato

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Benvenuto! Come posso aiutarti?',
    }
  ]);

  return (
    <div className="w-full max-w-2xl mx-auto h-screen flex flex-col bg-white rounded-lg shadow-lg p-4">
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
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
