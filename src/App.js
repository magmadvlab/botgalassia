import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, MapPin, Map } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import faqData from './faq/it/faqData';

// Importazione dei servizi aggiuntivi
import { fetchWeatherData, formatWeatherMessage } from './services/weatherService';
import { fetchTrafficUpdates } from './services/trafficService';
import { detectUserLanguage, translateTextIfNeeded } from './services/translationService';
import { GOOGLE_MAPS_URL } from './services/mapService';

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Ciao, sono Lunaria ✨, l\'assistente virtuale dell\'Hotel Galassia. Sono qui per guidarti tra le stelle alpine e rispondere a tutte le tue domande sul soggiorno. Come posso aiutarti?' }
  ]);
  const [input, setInput] = useState('');
  const [userLang, setUserLang] = useState('it');
  const messagesEndRef = useRef(null);

  // Funzione per lo scrolling della chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const lang = detectUserLanguage();
    setUserLang(lang);

    // Caricamento Meteo e Viabilità all'avvio
    const loadWeatherAndTraffic = async () => {
      try {
        // Recupera il meteo
        const weatherData = await fetchWeatherData(lang);
        const weatherMessage = formatWeatherMessage(weatherData, lang);
        
        // Recupera la viabilità
        const trafficUpdates = await fetchTrafficUpdates();
        const trafficMessage = trafficUpdates.map(update => update.description).join("\n\n");

        // Aggiunge i messaggi alla chat
        setMessages(prev => [
          ...prev,
          { type: 'bot', content: weatherMessage },
          { type: 'bot', content: trafficMessage }
        ]);
      } catch (error) {
        console.error("Errore nel caricamento dei dati meteo/viabilità:", error);
      }
    };

    loadWeatherAndTraffic();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Funzione per espandere le parole chiave e migliorare il matching
  const expandInput = (userInput) => {
    const transformations = {
      'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
      'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness'],
      'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
      'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
      'navetta': ['shuttle', 'bus', 'transfer', 'trasporto'],
      'parcheggio': ['garage', 'posto auto', 'box auto'],
      'skibox': ['ski box', 'deposito sci', 'porta sci'],
      'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo'],
      'animale': ['pet', 'cane', 'gatto', 'animali']
    };

    let expandedInput = userInput.toLowerCase();
    Object.entries(transformations).forEach(([key, values]) => {
      values.forEach(value => {
        if (expandedInput.includes(value.toLowerCase())) {
          expandedInput = expandedInput.replace(value.toLowerCase(), key);
        }
      });
    });

    return expandedInput;
  };

  // Funzione per trovare la migliore risposta dalle FAQ
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

  // Gestione della richiesta dell'utente
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    let response = findBestResponse(input);

    // Traduzione se necessaria
    if (userLang !== 'it') {
      response.content = await translateTextIfNeeded(response.content, userLang);
    }

    setMessages((prev) => [...prev, userMessage, { type: 'bot', title: response.title, content: response.content }]);
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
        {/* Pulsante per Viabilità */}
        <button
          onClick={() => fetchTrafficUpdates()}
          className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90 flex items-center justify-center"
        >
          <MapPin className="w-5 h-5 mr-2" /> Verifica Viabilità
        </button>

        {/* Pulsante per Google Maps */}
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
