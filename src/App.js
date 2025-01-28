import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, Phone } from 'lucide-react';
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

const getWeekday = () => {
  const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const today = new Date();
  return `${days[today.getDay()]} ${today.getDate()} ${today.toLocaleString('it-IT', { month: 'long' })}`;
};

const generateWelcomeMessage = async () => {
  try {
    const API_KEY = "980c870dc62110aa459671a67531a14e";
    const lat = 44.2537;
    const lon = 7.7915;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const weekday = getWeekday();
    
    let emoji = '🌄';
    if (conditions.includes("neve")) emoji = "❄️";
    else if (conditions.includes("pioggia")) emoji = "🌧";
    else if (conditions.includes("temporale")) emoji = "⛈";
    else if (conditions.includes("sole")) emoji = "☀️";
    else if (conditions.includes("nuvol")) emoji = "☁️";
    else if (conditions.includes("foschia")) emoji = "🌫";

    let message = `Buongiorno! Oggi è **${weekday}**. ${emoji} Il cielo è ${conditions} e la temperatura è di **${temperature}°C**.`;
    
    if (conditions.includes("neve")) {
      message += " Perfetto per una giornata di sci! ⛷ Ricorda di controllare la viabilità e di avere le catene a bordo.";
    } else if (conditions.includes("pioggia") || conditions.includes("temporale")) {
      message += " 🌧 Ti consigliamo di rilassarti nella nostra area relax o goderti una cioccolata calda al bar.";
    } else if (conditions.includes("sole")) {
      message += " ☀️ Una giornata perfetta per sciare e godersi il sole sulle piste!";
    } else if (conditions.includes("nebbia") || conditions.includes("foschia")) {
      message += " 🌫 La visibilità è ridotta, presta attenzione se stai viaggiando.";
    }
    
    if (conditions.includes("forte nevicata") || conditions.includes("ghiaccio")) {
      message += " ⚠️ Le condizioni meteo sono avverse. Se hai bisogno di assistenza, contatta la reception: 📞 +39 0174 334183.";
    }
    
    return message;
  } catch (error) {
    console.error("Errore nel recupero del meteo:", error);
    return "Benvenuto all'Hotel Galassia! 🌄 Non sono riuscito a recuperare il meteo, ma sono qui per aiutarti con tutte le tue domande.";
  }
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-lg ${message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm'}`}>
              {message.title && (<div className="font-bold text-base mb-1">{message.title}</div>)}
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
    </div>
  );
};

export default App;
