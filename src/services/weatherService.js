// src/services/WeatherService.js

const WEATHER_CONFIG = {
  API_KEY: "980c870dc62110aa459671a67531a14e",
  LAT: 44.2537,
  LON: 7.7915,
  UNITS: "metric"
};

/**
 * Recupera i dati meteo da OpenWeather API
 * @param {string} lang - Codice lingua (es: 'it', 'en')
 * @returns {Promise<Object>} Dati meteo
 */
export const fetchWeatherData = async (lang = 'it') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}&units=${WEATHER_CONFIG.UNITS}&lang=${lang}&appid=${WEATHER_CONFIG.API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Errore nel recupero dei dati meteo');
    return await response.json();
  } catch (error) {
    console.error('WeatherService error:', error);
    return null;
  }
};

/**
 * Formatta un messaggio meteo dinamico con data inclusa
 * @param {Object} weatherData - Dati meteo dall'API
 * @param {string} lang - Lingua desiderata
 * @returns {string} Messaggio meteo formattato
 */
export const formatWeatherMessage = (weatherData, lang = 'it') => {
  if (!weatherData) {
    return "🌄 Non sono riuscito a recuperare il meteo, ma sono qui per aiutarti con tutte le tue domande.";
  }

  const temp = Math.round(weatherData.main.temp);
  const conditions = weatherData.weather[0].description;
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', options);

  const messages = {
    it: {
      snow: `❄ ${dateString} ⛄ Sta nevicando a Prato Nevoso! La temperatura è di ${temp}°C. Ideale per gli amanti della neve! 🎿`,
      sunny: `☀ ${dateString} Splendida giornata di sole a Prato Nevoso con ${temp}°C. Perfetto per divertirsi sulle piste! ⛷️`,
      cloudy: `⛅ ${dateString} A Prato Nevoso il cielo è coperto e ci sono ${temp}°C. Momento perfetto per un po' di relax! 🏔️`,
      rain: `🌧️ ${dateString} Oggi piove a Prato Nevoso con ${temp}°C. Forse è il momento giusto per una cioccolata calda? ☕`,
      default: `🌤️ ${dateString} Il tempo a Prato Nevoso è ${conditions} con ${temp}°C. Buona giornata!`
    }
  };

  const msgs = messages[lang] || messages.it;
  if (conditions.includes('neve')) return msgs.snow;
  if (conditions.includes('sole') || conditions.includes('sereno')) return msgs.sunny;
  if (conditions.includes('nuvol')) return msgs.cloudy;
  if (conditions.includes('pioggia')) return msgs.rain;
  return msgs.default;
};
