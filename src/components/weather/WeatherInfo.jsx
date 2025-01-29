import React, { useState, useEffect } from 'react';
import { fetchWeatherData, formatWeatherMessage } from '../../services/weatherService';

const WeatherInfo = ({ lang, addMessageToChat }) => {
  const [weatherLoaded, setWeatherLoaded] = useState(false); // Evita duplicazioni

  useEffect(() => {
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

  return null;
};

export default WeatherInfo;
