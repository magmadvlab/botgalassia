import React, { useState, useEffect } from 'react';
import { fetchWeatherData, formatWeatherMessage } from '../../services/weatherService';

const WeatherInfo = ({ lang, addMessageToChat }) => {
  const [weatherLoaded, setWeatherLoaded] = useState(false); // Evita duplicazioni

  useEffect(() => {
    console.log("Lingua rilevata in WeatherInfo:", lang);  // Aggiungi questo per il debug
    const fetchWeather = async () => {
      try {
        const weatherData = await fetchWeatherData(lang);
        const message = formatWeatherMessage(weatherData, lang);

        if (!weatherLoaded) {
          addMessageToChat(prev => [...prev, { type: 'bot', content: message }]);
          setWeatherLoaded(true); // Segnala che il messaggio è stato inviato
        }
      } catch (error) {
        console.error('Errore nel recupero del meteo:', error);
      }
    };

    fetchWeather();
  }, [lang, weatherLoaded, addMessageToChat]);

  return null;  // Non rendere nulla perché il messaggio è già aggiunto via chat
};

export default WeatherInfo;
