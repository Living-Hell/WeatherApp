import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");
  const apiKey = "8d5afd9f892eb16a97c8cb8f44c85f55";

  const getWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      const { main, wind } = data;
      setWeather({ main, wind });
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowWeather = async () => {
    await getWeather();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleShowWeather();
    }
  };

  return (
    <div className="weather-container">
      <div className="input-container">
        <h1>Enter the city:</h1>
        <input
          placeholder="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleShowWeather}>Show</button>
      </div>
      <div className="weather-details">
        {weather && (
          <div>
            <h2>Weather Details for {city}</h2>
            <p>Temperature: {weather.main.temp}K</p>
            <p>Feels Like: {weather.main.feels_like}K</p>
            <p>Min Temperature: {weather.main.temp_min}K</p>
            <p>Max Temperature: {weather.main.temp_max}K</p>
            <p>Pressure: {weather.main.pressure}hPa</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed}m/s</p>
            <p>Wind Direction: {weather.wind.deg}°</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
