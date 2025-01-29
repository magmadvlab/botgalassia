import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, MapPin, Map } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import { detectUserLanguage, translateTextIfNeeded } from './services/translationService';
import { getFAQResponse } from './services/faqService';
import { fetchWeatherData, formatWeatherMessage } from './services/weatherService';
import { fetchTrafficUpdates } from './services/trafficService';
import TrafficInfo from './components/traffic/TrafficInfo';
import WeatherInfo from './components/weather/WeatherInfo';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=44.2537,7.7915";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userLang, setUserLang] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const lang = detectUserLanguage();
    console.log("Lingua rilevata:", lang);
    setUserLang(lang);

    // Messaggio di benvenuto di Lumia
    const welcomeMessage = `Ciao! Sono Lumia ✨, l'assistente virtuale dell'Hotel Galassia. Sono qui per aiutarti. Come posso assisterti?`;
    setMessages(prev => [...prev, { type: 'bot', content: welcomeMessage }]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserQuery = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Mostra il messaggio dell'utente nella chat
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Ottieni la risposta dalla FAQ
    const response = await getFAQResponse(input, userLang);

    // Mostra la risposta nella chat
    setMessages(prev => [...prev, { type: 'bot', content: response }]);
    setInput('');
  };

  const handleWeatherQuery = async () => {
    try {
      const weatherData = await fetchWeatherData(userLang);
      const weatherMessage = formatWeatherMessage(weatherData, userLang);
      setMessages(prev => [...prev, { type: 'bot', content: weatherMessage }]);
    } catch (error) {
      console.error('Errore meteo:', error);
      setMessages(prev => [...prev, { type: 'bot', content: "⚠️ Errore nel recupero del meteo." }]);
    }
  };

  const handleTrafficQuery = async () => {
    try {
      const updates = await fetchTrafficUpdates();
      if (updates.length === 0) {
        setMessages(prev => [...prev, { type: 'bot', content: "🚦 Nessun aggiornamento di viabilità al momento." }]);
        return;
      }

      const formattedUpdates = updates.map(update =>
        `🚧 **${update.title}**\n📅 ${update.date.toLocaleDateString()}\n🛣️ Strade interessate: ${update.affectedRoads.join(', ')}`
      ).join("\n\n");

      setMessages(prev => [...prev, { type: 'bot', content: formattedUpdates }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', content: "⚠️ Errore nel recupero della viabilità. Consulta la fonte ufficiale: [Provincia Cuneo](https://www.provincia.cuneo.it/viabilita)" }]);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="bg-[#B8860B] p-4">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <img src={logo} alt="Hotel Galassia Logo" className="w-40 mb-2" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Sezione meteo */}
       <WeatherInfo lang={userLang} addMessageToChat={setMessages} />

        {/* Sezione viabilità */}
        <TrafficInfo />

        {/* Chat */}
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
        {/* Pulsante per la Viabilità */}
        <button
          onClick={handleTrafficQuery}
          className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 flex items-center justify-center"
        >
          <MapPin className="w-5 h-5 mr-2" /> Verifica Viabilità
        </button>

        {/* Pulsante per Google Maps */}
        <button
          onClick={() => window.open(GOOGLE_MAPS_URL, '_blank')}
          className="bg-[#0080FF] text-white p-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:ring-offset-2 flex items-center justify-center"
        >
          <Map className="w-5 h-5 mr-2" /> Ottieni Indicazioni
        </button>

         {/* Form per la chat */}
        <form className="flex space-x-2" onSubmit={handleUserQuery}>
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
