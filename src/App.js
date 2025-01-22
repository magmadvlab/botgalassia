import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, Globe } from 'lucide-react';
import logo from './logo-galassia-prato-nevoso.png';

// FAQ Imports
import * as transportFAQ from './faq/it/transport_it';
import * as wellnessFAQ from './faq/it/wellness_it';
import * as skiFAQ from './faq/it/ski_it';
import * as petsFAQ from './faq/it/pets_it';
import * as checkinFAQ from './faq/it/checkin_it';
import * as diningFAQ from './faq/it/dining_it';
import * as emergencyFAQ from './faq/it/emergency_it';
import * as entertainmentFAQ from './faq/it/entertainment_it';
import * as techServicesFAQ from './faq/it/tech_services_it';
import * as activitiesFAQ from './faq/it/activities_it';
import * as attractionsFAQ from './faq/it/attractions_it';

const ALL_FAQ = {
  transport: transportFAQ,
  wellness: wellnessFAQ,
  ski: skiFAQ,
  pets: petsFAQ,
  checkin: checkinFAQ,
  dining: diningFAQ,
  emergency: emergencyFAQ,
  entertainment: entertainmentFAQ,
  techServices: techServicesFAQ,
  activities: activitiesFAQ,
  attractions: attractionsFAQ,
};

const languages = {
  it: {
    welcome: 'Benvenuto! Come posso aiutarti?',
    placeholder: 'Scrivi un messaggio...',
    jsError: 'È necessario abilitare JavaScript per utilizzare questa applicazione.',
    processing: 'Sto elaborando la tua richiesta...',
    noMatch: 'Mi dispiace, non ho trovato una risposta pertinente. Potresti riformulare la domanda?'
  },
  en: {
    welcome: 'Welcome! How can I help you?',
    placeholder: 'Type a message...',
    jsError: 'You need to enable JavaScript to run this app.',
    processing: 'Processing your request...',
    noMatch: 'Sorry, I couldn\'t find a relevant answer. Could you rephrase your question?'
  }
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('it');
  const [isJsEnabled, setIsJsEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  // Rest of your existing setup code...

  const findBestMatch = (input) => {
    const userInput = input.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    Object.entries(ALL_FAQ).forEach(([category, faq]) => {
      Object.entries(faq).forEach(([key, data]) => {
        const keywords = data.keywords || [];
        const matchScore = keywords.reduce((score, keyword) => {
          if (userInput.includes(keyword.toLowerCase())) {
            score += 1;
          }
          return score;
        }, 0);

        if (matchScore > highestScore) {
          highestScore = matchScore;
          bestMatch = {
            category,
            answer: data.answer,
            followUp: data.followUp
          };
        }
      });
    });

    return bestMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const match = findBestMatch(input);
    const botMessage = {
      type: 'bot',
      title: 'Info',
      content: match ? match.answer : languages[language].noMatch,
      followUp: match?.followUp
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  // Rest of your component code remains the same...
};

export default App;
