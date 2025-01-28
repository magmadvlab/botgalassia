import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, MapPin, Phone } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import faqData from './faq/faqData';

const Header = () => {
  return (
    <header className="bg-[#B8860B] p-4">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <img src={logo} alt="Hotel Galassia Logo" className="w-48 mb-2" />
      </div>
    </header>
  );
};

const fetchWeatherMessage = async () => {
  try {
    const API_KEY = "980c870dc62110aa459671a67531a14e";
    const lat = 44.2537;
    const lon = 7.7915;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    
    let emoji = '🌄';
    if (conditions.includes("neve")) emoji = "❄";
    else if (conditions.includes("pioggia")) emoji = "🌧";
    else if (conditions.includes("sole")) emoji = "☀";
    else if (conditions.includes("nuvol")) emoji = "☁";

    return `Buongiorno! ☀ Oggi il meteo è ${conditions} con una temperatura di **${temperature}°C**. ${emoji} Goditi la tua giornata a Prato Nevoso!`;
  } catch (error) {
    console.error("Errore nel recupero del meteo:", error);
    return "Buongiorno! Non sono riuscito a recuperare le informazioni meteo, ma sono qui per aiutarti con qualsiasi altra domanda.";
  }
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadInitialMessages = async () => {
      const weatherMessage = await fetchWeatherMessage();
      setMessages([
        { type: 'bot', content: weatherMessage },
        { type: 'bot', content: 'Ciao, sono Lumia ✨, l\'assistente virtuale dell\'Hotel Galassia. Sono qui per aiutarti. Come posso assisterti?' }
      ]);
    };
    loadInitialMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = findBestResponse(input);
    setMessages((prev) => [...prev, { type: 'bot', content: response.content }]);
    setInput('');
  };

  const findBestResponse = (userInput) => {
    const processedInput = userInput.toLowerCase().trim();
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
      content: `Mi dispiace, non ho capito. Prova a chiedere usando parole chiave come "piscina", "check-in" o "navetta". Se hai bisogno di ulteriore assistenza, puoi contattare la reception al numero +39 0174 334183.`
    };
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-lg ${message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm'}`}>
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <div className="flex justify-center mt-4">
          <a href="https://www.google.com/maps/dir/?api=1&destination=44.2537,7.7915" target="_blank" rel="noopener noreferrer"
             className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Indicazioni per l'Hotel</span>
          </a>
        </div>
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
