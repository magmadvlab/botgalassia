import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import { getFAQResponse } from './services/faqService';
import { fetchWeatherData, formatWeatherMessage } from './services/weatherService';
import { fetchRoadNews } from './services/trafficService';
import { detectUserLanguage } from './services/translationService';
import { GOOGLE_MAPS_URL } from './services/mapsService';

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Ciao, sono Lunaria ✨, l'assistente virtuale dell'Hotel Galassia. Sono qui per guidarti tra le stelle alpine e rispondere a tutte le tue domande sul soggiorno. Come posso aiutarti?" }
  ]);
  const [input, setInput] = useState('');
  const [userLang, setUserLang] = useState('it');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setUserLang(detectUserLanguage());

    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(userLang);
        const weatherMessage = formatWeatherMessage(weatherData, userLang);
        const trafficUpdates = await fetchRoadNews();
        const trafficMessage = trafficUpdates.map(update => update.description).join("

");

        setMessages(prev => [
          ...prev,
          { type: 'bot', content: weatherMessage },
          { type: 'bot', content: trafficMessage }
        ]);
      } catch (error) {
        console.error("Errore nel caricamento dei dati meteo/viabilità:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const { answer } = await getFAQResponse(input, userLang);
    setMessages((prev) => [...prev, { type: 'bot', content: answer }]);

    setInput('');
};

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="bg-[#B8860B] p-4">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <img src={logo} alt="Hotel Galassia Logo" className="w-32 mb-2" />
          <div className="text-white text-sm">PRATO NEVOSO ★★★</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-lg ${message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm'}`}>
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-3 flex flex-col space-y-2">
        <button
          onClick={async () => {
            const trafficUpdates = await fetchRoadNews();
            setMessages(prev => [...prev, ...trafficUpdates.map(update => ({ type: 'bot', content: update.description }))]);
          }}
          className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90 flex items-center justify-center"
        >
          <MapPin className="w-5 h-5 mr-2" /> Verifica Viabilità
        </button>

        <button
          onClick={() => window.open(GOOGLE_MAPS_URL, '_blank')}
          className="bg-blue-500 text-white p-3 rounded-lg hover:opacity-90 flex items-center justify-center"
        >
          <Map className="w-5 h-5 mr-2" /> Ottieni Indicazioni
        </button>
        <form className="flex space-x-2" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Fai una domanda..." className="flex-1 p-3 border border-gray-200 rounded-lg text-sm" />
          <button type="submit" className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
