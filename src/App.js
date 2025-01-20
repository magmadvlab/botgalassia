import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

// ... (tutte le altre costanti e funzioni utilità rimangono invariate)

const App = () => {
    // ... (tutto lo stato e gli useEffect rimangono invariati)

    // ... (la funzione findBestResponse rimane invariata)

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
        // Implementazione del feedback (esempio)
        console.log(`Feedback per il messaggio ${messageId}: ${isHelpful ? 'Utile' : 'Non utile'}`);
    };

    return (
        <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
            {/* ... (Header) */}
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
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            {/* ... (Input area) */}
            <div className="border-t bg-white p-4 rounded-b-lg">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={SUPPORTED_LANGUAGES[currentLang].inputPlaceholder}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                    />
                    <button type="submit" className="bg-[#B8860B] text-white p-2 rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2">
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default App;
