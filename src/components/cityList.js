import React, { useState, useEffect } from 'react';
import { CgArrowUpR } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { setWeatherData } from '../redux/HomeSlice';
import '../styles/cityList.css';

const API_KEY = '10face67f7074b8fad7120709231709';

const CityList = () => {
  const cities = [
    { name: 'New York' },
    { name: 'Siaya' },
    { name: 'Kisumu' },
    { name: 'Nairobi' },
    { name: 'Nakuru' },
  ];

  const dispatch = useDispatch();

  const [cityWeatherData, setCityWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherForCity = async (city) => {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      const data = await response.json();
      setCityWeatherData((prevData) => ({ ...prevData, [city]: data }));
    };

    cities.forEach((city) => {
      fetchWeatherForCity(city.name);
    });
  }, []);

  const handleClick = async (city) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=no&alerts=no`);
    const data = await response.json();
    dispatch(setWeatherData(data));

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="city-list-section">
      <div>
        <h2>City List</h2>
        <ul className="ul">
          {cities.map((city) => (
            <li key={city.name} className="city-details">
              <p className="city-name">{city.name}</p>
              {cityWeatherData[city.name] && (
                <>
                  <p className="city-temp">
                    {cityWeatherData[city.name].current.temp_c}
                    °C
                  </p>
                  <img alt="current-weather" className="city-icon" src={cityWeatherData[city.name].current.condition.icon} />
                  <button type="button" className="city-button" onClick={() => handleClick(city.name)}>
                    <CgArrowUpR className="city-click" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityList;
