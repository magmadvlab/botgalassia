import React, { useState, useEffect } from 'react';
import { fetchWeatherData, formatWeatherMessage } from '../../services/weatherService';

const WeatherInfo = ({ lang = 'it', addMessageToChat }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(lang);
        setWeather(data);
        setLoading(false);
        
        // 📌 Invia il messaggio meteo alla chat
        if (addMessageToChat) {
          addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: formatWeatherMessage(data, lang) }]);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
    // Aggiorna il meteo ogni 30 minuti
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lang, addMessageToChat]);

  if (loading) {
    return <div className="text-sm text-gray-600">⏳ Caricamento meteo...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-600">⚠️ Errore nel caricamento del meteo: {error}</div>;
  }

  return null; // 📌 Non mostra nulla perché il messaggio è già stato inviato in chat
};

export default WeatherInfo;
