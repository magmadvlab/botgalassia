import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import faqData from './faq/faqData';

const Header = () => {
  return (
    <header className="bg-[#B8860B] p-4">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <img src={logo} alt="Hotel Galassia Logo" className="w-32 mb-2" />
        <div className="text-white text-sm">PRATO NEVOSO ★★★</div>
      </div>
    </header>
  );
};

const transformations = {
  'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
  'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness'],
  'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
  'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
  'navetta': ['shuttle', 'bus', 'transfer', 'trasporto'],
  'parcheggio': ['garage', 'posto auto', 'box auto'],
  'skibox': ['ski box', 'deposito sci', 'porta sci'],
  'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo'],
  'animale': ['pet', 'cane', 'gatto', 'animali'],
  'piano -1': ['sotterraneo', 'sotto', 'basement'],
  'arrivare': ['raggiungere', 'andare', 'trovare'],
  'prenotare': ['riservare', 'richiedere', 'bisogna prenotare']
};

const pluralSingular = {
  'emergenze': 'emergenza',
  'attività': 'attività',
  'servizi': 'servizio',
  'animali': 'animale'
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateWelcomeMessage = async () => {
    try {
      const API_KEY = "980c870dc62110aa459671a67531a14e"; // Tua API Key
      const lat = 44.2537; // Latitudine Hotel Galassia
      const lon = 7.7915; // Longitudine Hotel Galassia
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const conditions = data.weather[0].description;

      let message = `Benvenuto all'Hotel Galassia! `;
      if (conditions.includes("neve")) {
        message += `❄ Sta nevicando a Prato Nevoso e la temperatura è di **${temperature}°C**. Perfetto per gli amanti della neve fresca! 🎿`;
      } else if (conditions.includes("sole")) {
        message += `☀ Oggi il sole splende su Prato Nevoso con una temperatura di **${temperature}°C**. Ideale per una giornata indimenticabile!`;
      } else {
        message += `☁ Oggi il cielo è ${conditions} e la temperatura è di **${temperature}°C**. Rilassati e goditi la vista mozzafiato sulle montagne.`;
      }

      return message;
    } catch (error) {
      console.error("Errore nel recupero del meteo:", error);
      return "Benvenuto all'Hotel Galassia! 🌄 Non sono riuscito a recuperare il meteo, ma sono qui per aiutarti con tutte le tue domande.";
    }
  };

  useEffect(() => {
    const loadWelcomeMessage = async () => {
      const welcomeMessage = await generateWelcomeMessage();
      setMessages((prev) => [
        { type: 'bot', content: welcomeMessage },
        { type: 'bot', content: 'Ciao, sono Lunaria ✨, l\'assistente virtuale dell\'Hotel Galassia. Sono qui per guidarti tra le stelle alpine e rispondere a tutte le tue domande sul soggiorno. Come posso aiutarti?' }
      ]);
    };

    loadWelcomeMessage();
  }, []);

  const expandInput = (userInput) => {
    let expandedInput = userInput.toLowerCase();
    
    Object.entries(transformations).forEach(([key, values]) => {
      values.forEach(value => {
        if (expandedInput.includes(value.toLowerCase())) {
          expandedInput = expandedInput.replace(value.toLowerCase(), key);
        }
      });
    });

    Object.entries(pluralSingular).forEach(([plural, singular]) => {
      if (expandedInput.includes(plural)) {
        expandedInput = expandedInput.replace(plural, singular);
      }
    });
    
    return expandedInput;
  };

  const findBestResponse = (userInput) => {
    const processedInput = expandInput(userInput.toLowerCase().trim());

    let bestMatch = null;
    for (const [category, data] of Object.entries(faqData)) {
      for (const [question, qData] of Object.entries(data.questions)) {
        if (qData.tags.some(tag => processedInput.includes(tag))) {
          bestMatch = {
            title: data.title,
            content: qData.answer
          };
          break;
        }
      }
    }

    return bestMatch || {
      title: 'Info',
      content: 'Mi dispiace, non ho capito. Prova a chiedere usando parole chiave come "piscina", "check-in" o "navetta".'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);
    setMessages((prev) => [...prev, userMessage, { type: 'bot', title: response.title, content: response.content }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-lg ${
                message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm'
              }`}
            >
              {message.title && (
                <div className="font-bold text-base mb-1">{message.title}</div>
              )}
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-3">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fai una domanda..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B8860B] text-sm"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
