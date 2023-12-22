import React, { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'



const Weather = () => {
  
    const api_key = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
    
    console.log('API Key:', api_key);

    const [inputValue, setInputValue] = useState('');
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
    const [temperature, setTemperature] = useState('24');
    const [humidity, setHumidity] = useState('64%');
    const [windRate, setWindRate] = useState('18 km/h');
    const [location, setLocation] = useState('London');
  
    const weatherIconMapping = {
      '01d': clear_icon,
      '01n': clear_icon,
      '02d': cloud_icon,
      '02n': cloud_icon,
      '03d': drizzle_icon,
      '03n': drizzle_icon,
      '04d': drizzle_icon,
      '04n': drizzle_icon,
      '09d': rain_icon,
      '09n': rain_icon,
      '10d': rain_icon,
      '10n': rain_icon,
      '13d': snow_icon,
      '13n': snow_icon,
    };
  
    const search = async () => {
      if (!inputValue) {
        return;
      }
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        setHumidity(`${data.main.humidity}%`);
        setWindRate(`${data.wind.speed} km/h`);
        setTemperature(`${Math.floor(data.main.temp)}°c`);
        setLocation(data.name);
  
        const iconType = data.weather[0].icon;
        setWeatherIcon(weatherIconMapping[iconType] || clear_icon);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    return (
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={weatherIcon} alt="" />
        </div>
        <div className="weather-temp">{temperature}</div>
        <div className="weather-location">{location}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">{windRate}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Weather