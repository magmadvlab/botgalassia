// src/services/weatherService.js

const WEATHER_CONFIG = {
  API_KEY: process.env.OPENWEATHER_API_KEY,
  LAT: 44.2537,
  LON: 7.7915,
  UNITS: "metric"
};

/**
 * Fetches weather data from OpenWeather API
 * @param {string} lang - Language code (it/en)
 * @returns {Promise<Object>} Weather data
 */
export const fetchWeatherData = async (lang = 'it') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}&units=${WEATHER_CONFIG.UNITS}&lang=${lang}&appid=${WEATHER_CONFIG.API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather service error:', error);
    return null;
  }
};

/**
 * Formats a dynamic weather message based on conditions
 * @param {Object} weatherData - Weather data from API
 * @param {string} lang - Language code
 * @returns {string} Formatted message
 */
export const formatWeatherMessage = (weatherData, lang = 'it') => {
  if (!weatherData) {
    return lang === 'it' ?
      "❗ Errore nel recupero delle informazioni meteo. Verifica le condizioni su un sito affidabile." :
      "❗ Error fetching weather information. Please check a reliable weather source.";
  }
  
  const temp = Math.round(weatherData.main.temp);
  const conditions = weatherData.weather[0].description.toLowerCase();
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', options);

  const messages = {
    it: {
      snow: `❄️ ${dateString} ⛄ Nevicata in corso a Prato Nevoso! Temperatura: ${temp}°C. Ottima giornata per sciare! 🎿`,
      sunny: `🌞 ${dateString} Giornata soleggiata a Prato Nevoso, ${temp}°C. Perfetto per le piste! ⛷️`,
      cloudy: `⛅ ${dateString} Cielo coperto a Prato Nevoso, ${temp}°C. Atmosfera perfetta per un'escursione! 🏔️`,
      rain: `🌧️ ${dateString} Pioggia a Prato Nevoso, ${temp}°C. Rilassati nel nostro hotel accogliente! ☕`,
      default: `🌤️ ${dateString} A Prato Nevoso il meteo è ${conditions} con ${temp}°C. Goditi la montagna! 🏔️`
    },
    en: {
      snow: `❄️ ${dateString} ⛄ Snowfall in Prato Nevoso! Temperature: ${temp}°C. Perfect day for skiing! 🎿`,
      sunny: `🌞 ${dateString} Sunny day in Prato Nevoso, ${temp}°C. The slopes are waiting! ⛷️`,
      cloudy: `⛅ ${dateString} Cloudy in Prato Nevoso, ${temp}°C. A great day for exploring! 🏔️`,
      rain: `🌧️ ${dateString} Rainy day in Prato Nevoso, ${temp}°C. Cozy up in the hotel! ☕`,
      default: `🌤️ ${dateString} In Prato Nevoso, the weather is ${conditions} with ${temp}°C. Enjoy the mountains! 🏔️`
    }
  };

  const msgs = messages[lang] || messages.it;
  if (conditions.includes('neve') || conditions.includes('snow')) return msgs.snow;
  if (conditions.includes('sole') || conditions.includes('clear') || conditions.includes('sereno')) return msgs.sunny;
  if (conditions.includes('nuvol') || conditions.includes('cloud')) return msgs.cloudy;
  if (conditions.includes('pioggia') || conditions.includes('rain')) return msgs.rain;
  return msgs.default;
};
