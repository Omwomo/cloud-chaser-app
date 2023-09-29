import React from 'react';
import { useSelector } from 'react-redux';
import { MdAccessAlarm, MdLocationOn } from 'react-icons/md';
import { selectWeatherData } from '../redux/HomeSlice';
import HourlyForecast from './HourlyForecast';
import Details from './Details';
import DailyForecastTemp from './DailyForecastTemp';
import '../styles/WeatherDisplay.css';
import DailyForecastPrecip from './DailyForecastPrecip';
import Wind from './Wind';
import SunMoon from './SunMoon';

const WeatherDisplay = () => {
  const weatherData = useSelector(selectWeatherData);

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  const { location, current } = weatherData;

  return (
    <div className="location-details">
      <div className="summary">
        <p className="now">Now</p>
        <div className="condition">
          <div className="tm">
            <p className="summary-temperature">
              {current.temp_c}
              °C
            </p>
            <img alt="weather icon" src={current.condition.icon} />
          </div>
          <p>
            {current.condition.text}
          </p>
        </div>
        <hr className="horizontal-line" />
        <div className="time-location">
          <div className="location">
            <MdLocationOn className="summary-icon" />
            <p>
              {location.name}
              ,
              {' '}
              {location.country}
            </p>
          </div>
          <div className="date">
            <MdAccessAlarm className="summary-icon" />
            <p>{location.localtime}</p>
          </div>
        </div>
      </div>
      <Details />
      <HourlyForecast />
      <DailyForecastTemp />
      <DailyForecastPrecip />
      <Wind />
      <SunMoon />
    </div>
  );
};

export default WeatherDisplay;
