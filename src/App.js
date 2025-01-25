import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import logo from './logo-galassia-prato-nevoso.png';
import { FAQData } from './faq/faqData';

[Il resto del codice rimane identico fino alla definizione di findBestResponse]

const findBestResponse = (userInput) => {
  const processedInput = expandInput(userInput.toLowerCase().trim());

  const calculateMatchScore = (input, tags) => {
    return tags.reduce((score, tag) => {
      if (input.includes(tag.toLowerCase())) {
        score += tag.length / input.length;
      }
      return score;
    }, 0);
  };

  let bestMatch = null;
  let bestScore = 0;

  for (const [category, data] of Object.entries(FAQData)) {
    const allTags = [...(data.keywords || [])];
    const categoryScore = calculateMatchScore(processedInput, allTags);
    
    if (categoryScore > 0) {
      for (const [question, qData] of Object.entries(data.questions)) {
        const score = calculateMatchScore(processedInput, [...qData.tags, ...allTags]);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = {
            title: data.title,
            content: qData.answer
          };
        }
      }
    }
  }

  if (bestMatch && bestScore > 0.3) {
    return [bestMatch];
  }

  // Log missing questions
  fetch('/log-missing-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: userInput,
      timestamp: new Date().toISOString(),
    }),
  }).catch(console.error);

  return [{
    title: 'Info',
    content: 'Mi dispiace, non ho capito. Prova a chiedere usando parole chiave come "piscina", "check-in" o "navetta".'
  }];
};

  const handleFeedback = (index, feedbackType, userInput) => {
    fetch('/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userInput,
        feedback: feedbackType,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const responses = findBestResponse(input);
    const botMessages = responses.map((res) => ({
      type: 'bot',
      title: res.title,
      content: res.content,
    }));

    setMessages((prev) => [...prev, userMessage, ...botMessages]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />

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
