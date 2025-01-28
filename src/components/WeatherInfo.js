import React, { useState, useEffect } from 'react';

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "ca9757a704c11e39451877ca42fb9ec1"; // La tua API Key
  const city = "Cesana Torinese";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=it&appid=${API_KEY}`;

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

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div>
      <h3>Meteo a {weather.name}</h3>
      <p>Temperatura: {weather.main.temp}°C</p>
      <p>Percepita: {weather.main.feels_like}°C</p>
      <p>Condizioni: {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherInfo;
