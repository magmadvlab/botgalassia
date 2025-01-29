import React, { useState, useEffect } from 'react';
import { fetchWeatherData, formatWeatherMessage } from '../../services/weatherService';

const WeatherInfo = ({ lang = 'it', addMessageToChat }) => {
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await fetchWeatherData(lang);
        const message = formatWeatherMessage(weatherData, lang);
        addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: message }]);
      } catch (error) {
        console.error('Errore meteo:', error);
        addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: "⚠️ Errore nel recupero del meteo. Riprova più tardi!" }]);
      }
    };

    fetchWeather();
  }, [lang, addMessageToChat]);

  return null;
};

export default WeatherInfo;
