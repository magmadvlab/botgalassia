import React, { useState, useEffect } from 'react';

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "980c870dc62110aa459671a67531a14e"; // API Key di Hotel Galassia
  const lat = 44.2537; // Latitudine Hotel Galassia
  const lon = 7.7915; // Longitudine Hotel Galassia
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dati meteo");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <p>🌍 Recupero dati meteo...</p>;
  if (error) return <p>❌ Errore: {error}</p>;

  // Estrarre i dati meteo dalla risposta API
  const temperature = weather.main.temp;
  const feelsLike = weather.main.feels_like;
  const conditions = weather.weather[0].description;
  const windSpeed = weather.wind.speed;

  // Generare il messaggio dinamico
  let welcomeMessage = `🌡️ Attualmente ci sono ${temperature}°C (percepiti ${feelsLike}°C).`;
  if (conditions.includes("neve")) {
    welcomeMessage += " ❄ Sta nevicando, se viaggi in auto assicurati di avere le catene da neve!";
  } else if (windSpeed > 10) {
    welcomeMessage += " 💨 Il vento è forte, copriti bene!";
  } else {
    welcomeMessage += ` ☀️ Condizioni attuali: ${conditions}.`;
  }

  return (
    <div>
      <h3>📍 Meteo Hotel Galassia</h3>
      <p>{welcomeMessage}</p>
    </div>
  );
}

export default WeatherInfo;
