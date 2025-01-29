import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, MapPin, Map } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import faqData from './faq/faqData';
import { detectUserLanguage } from './services/translationService'; // Importiamo la funzione

const GOOGLE_MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=44.2537,7.7915";
const WEATHER_API_KEY = "980c870dc62110aa459671a67531a14e";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=44.2537&lon=7.7915&units=metric&lang=it&appid=${WEATHER_API_KEY}`;

const Header = () => {
  return (
    <header className="bg-[#B8860B] p-4">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <img src={logo} alt="Hotel Galassia Logo" className="w-40 mb-2" />
      </div>
    </header>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userLang, setUserLang] = useState(''); // Stato per la lingua utente
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const lang = detectUserLanguage(); // Rileva la lingua
    console.log("Lingua rilevata:", lang); // Verifica in console
    setUserLang(lang);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        
        const temperature = data.main.temp;
        const conditions = data.weather[0].description;

        let weatherMessage = `🌤️ Oggi a Prato Nevoso: ${conditions}, temperatura attuale: ${temperature}°C. `;
        if (conditions.includes("neve")) {
          weatherMessage += "❄️ Perfetto per sciare! Assicurati di avere le gomme da neve o le catene a bordo.";
        } else if (conditions.includes("pioggia")) {
          weatherMessage += "🌧 Porta con te un ombrello e goditi la montagna!";
        } else {
          weatherMessage += "🌞 Una giornata perfetta per esplorare le piste e il paesaggio!";
        }
        
        setMessages((prev) => [...prev, { type: 'bot', content: weatherMessage }]);
      } catch (error) {
        console.error('Errore nel recupero del meteo:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        <p className="text-center text-sm text-gray-500">Lingua rilevata: {userLang}</p> {/* Mostra la lingua rilevata */}
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
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-3 flex flex-col space-y-2">
        <button
          onClick={() => window.open(GOOGLE_MAPS_URL, '_blank')}
          className="bg-[#0080FF] text-white p-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:ring-offset-2 flex items-center justify-center"
        >
          <Map className="w-5 h-5 mr-2" /> Ottieni Indicazioni
        </button>
      </footer>
    </div>
  );
};

export default App;
