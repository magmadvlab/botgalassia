import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

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
      {/* Header con logo e info hotel */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Logo container */}
          <div className="w-full max-w-[200px] sm:max-w-[250px] mb-2">
            <img 
              src="/logo-galassia.png" 
              alt="Hotel Galassia" 
              className="w-full h-auto"
            />
          </div>
          {/* Stelle e location */}
          <div className="flex items-center space-x-1 text-[#B8860B] mb-1">
            <span>★</span><span>★</span><span>★</span>
          </div>
          <div className="text-gray-600 text-sm font-medium mb-1">
            PRATO NEVOSO
          </div>
          {/* Link al sito */}
          <a 
            href="https://pratonevoso.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#B8860B] text-sm hover:underline"
          >
            pratonevoso.it
          </a>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
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
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
