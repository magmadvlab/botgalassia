import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

const WEATHER_CONFIG = {
  API_KEY: "980c870dc62110aa459671a67531a14e",
  LAT: 44.2537,
  LON: 7.7915,
  UNITS: "metric"
};

const WeatherInfo = ({ lang = 'it' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatWeatherMessage = (weatherData) => {
    const temp = Math.round(weatherData.main.temp);
    const conditions = weatherData.weather[0].description;
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateString = date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', options);

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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}&units=${WEATHER_CONFIG.UNITS}&lang=${lang}&appid=${WEATHER_CONFIG.API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lang]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin mr-2">⭐</div>
            {lang === 'it' ? 'Caricamento meteo...' : 'Loading weather...'}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        {lang === 'it' ? 'Errore nel caricamento del meteo' : 'Error loading weather'}: {error}
      </Alert>
    );
  }

  if (!weather) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Main weather message */}
          <div className="text-lg font-medium">
            {formatWeatherMessage(weather)}
          </div>

          {/* Additional weather details */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">
                {lang === 'it' ? 'Temperatura percepita' : 'Feels like'}:
              </span>
              <br />
              {Math.round(weather.main.feels_like)}°C
            </div>
            <div>
              <span className="font-medium">
                {lang === 'it' ? 'Umidità' : 'Humidity'}:
              </span>
              <br />
              {weather.main.humidity}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
