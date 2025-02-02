import { Oval } from 'react-loader-spinner';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const backgrounds = [
    'url(./assets/9.png)',
    'url(./assets/54.png)',
    'url(./assets/17.png)'
  ];
  const changeBackground = () => {
    let index = 0;

    return () => {
      document.body.style.backgroundImage = backgrounds[index];
      document.body.style.backgroundSize = 'cover'; 
      index = (index + 1) % backgrounds.length;
    };
  };

  useEffect(() => {
    const backgroundChanger = changeBackground(); // Initialize the background changer
    const interval = setInterval(() => {
      backgroundChanger();
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const WeekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      const valid = await handleLoginNavigation();
      if(!valid){
        alert('Please login to access this page!');
        navigate('/login');
      }
      else{
        console.log(localStorage.getItem('Token'));
        event.preventDefault();
        setInput('');
        setWeather({ ...weather, loading: true });
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
        await axios
          .get(url, {
            params: {
              q: input,
              units: 'metric',
              appid: api_key,
            },
          })
          .then((res) => {
            console.log('res', res);
            setWeather({ data: res.data, loading: false, error: false });
          })
          .catch((error) => {
            setWeather({ ...weather, data: {}, error: true });
            setInput('');
            console.log('error', error);
        });
      }
    }
  };

  const handleLoginNavigation = async () => {
    const validateUrl = 'http://localhost:8080/authService/validate';
    const token = localStorage.getItem('Token');
    if (!token) {
      console.log('empty token');
      alert('Please login to access this feature!');
      return false;
    }
  
    try {
      const response = await fetch(validateUrl, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });
  
      if (response.ok) {
        const result = await response.text();
        return result === 'true';
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error in sending the request! please try again.  ' )
      return false;
    }
  };

  return (
    <div className="weather">
      <h1 className="app-name">
        Weather App
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
