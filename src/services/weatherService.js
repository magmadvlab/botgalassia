// src/services/weatherService.js

const WEATHER_CONFIG = {
  API_KEY: "980c870dc62110aa459671a67531a14e",
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
    throw error;
  }
};

/**
 * Formats a dynamic weather message based on conditions
 * @param {Object} weatherData - Weather data from API
 * @param {string} lang - Language code
 * @returns {string} Formatted message
 */
export const formatWeatherMessage = (weatherData, lang = 'it') => {
  const temp = Math.round(weatherData.main.temp);
  const conditions = weatherData.weather[0].description;
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', options);

  // Messages templates based on conditions
  const messages = {
    it: {
      snow: `❄️ ${dateString} ⛄ Che meraviglia, sta nevicando a Prato Nevoso! La temperatura è di ${temp}°C. È il momento perfetto per una fantastica giornata sugli sci! 🎿 🏂`,
      sunny: `🌞 ${dateString} Splendida giornata di sole a Prato Nevoso con ${temp}°C. Le piste ti aspettano per un'avventura indimenticabile! ⛷️ 🏔️`,
      cloudy: `⛅ ${dateString} A Prato Nevoso il cielo è coperto e ci sono ${temp}°C. Una giornata perfetta per scoprire la magia della montagna! 🗻 ✨`,
      rain: `🌧️ ${dateString} Oggi pioggia a Prato Nevoso e ${temp}°C. Un'occasione perfetta per rilassarsi nel nostro accogliente hotel! ☕ 🏡`,
      default: `🌤️ ${dateString} A Prato Nevoso ci sono ${conditions} e ${temp}°C. La magia della montagna ti aspetta per un'esperienza unica! 🏔️ ✨`
    },
    en: {
      snow: `❄️ ${dateString} ⛄ Amazing, it's snowing in Prato Nevoso! The temperature is ${temp}°C. Perfect time for an incredible day of skiing! 🎿 🏂`,
      sunny: `🌞 ${dateString} Beautiful sunny day in Prato Nevoso with ${temp}°C. The slopes are waiting for your unforgettable adventure! ⛷️ 🏔️`,
      cloudy: `⛅ ${dateString} In Prato Nevoso it's cloudy with ${temp}°C. A perfect day to discover the mountain magic! 🗻 ✨`,
      rain: `🌧️ ${dateString} Today it's raining in Prato Nevoso with ${temp}°C. Perfect time to relax in our cozy hotel! ☕ 🏡`,
      default: `🌤️ ${dateString} In Prato Nevoso we have ${conditions} and ${temp}°C. The mountain magic awaits you for a unique experience! 🏔️ ✨`
    }
  };

  const msgs = messages[lang] || messages.it;
  if (conditions.includes('neve') || conditions.includes('snow')) return msgs.snow;
  if (conditions.includes('sole') || conditions.includes('clear') || conditions.includes('sereno')) return msgs.sunny;
  if (conditions.includes('nuvol') || conditions.includes('cloud')) return msgs.cloudy;
  if (conditions.includes('pioggia') || conditions.includes('rain')) return msgs.rain;
  return msgs.default;
};
