"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c4c194b4e2b4dfe637793bda0345bbc1`);
      setWeather(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02122D]">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Weather App</h1>
        <div className="flex items-center mb-4">
          <input
            className="appearance-none border border-blue-500 rounded-l py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-700"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r px-4 py-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {weather && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Weather in {weather.name}</h2>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(0)}&#176;C</p>
            <p className="text-lg">Humidity: {weather.main.humidity}%</p>
            <p className="text-lg">Pressure: {weather.main.pressure}hPa</p>
            <p className="text-lg">Weather Conditions: {weather.weather[0].main}</p>
            <p className="text-lg">Description: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}