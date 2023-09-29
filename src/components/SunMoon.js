import React from 'react';
import {
  WiSolarEclipse, WiMoonWaningCrescent1, WiMoonWaxingCrescent5, WiHorizonAlt,
} from 'react-icons/wi';
import { useSelector } from 'react-redux';
import { selectWeatherData } from '../redux/HomeSlice';
import '../styles/SunMoon.css';

const SunMoon = () => {
  const weatherData = useSelector(selectWeatherData);

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  const { forecast } = weatherData;
  const Sunrise = forecast.forecastday[0].astro.sunrise;
  const Sunset = forecast.forecastday[0].astro.sunset;

  const Moonrise = forecast.forecastday[0].astro.moonrise;
  const Moonset = forecast.forecastday[0].astro.moonset;

  const Moonphase = forecast.forecastday[0].astro.moon_phase;
  const MoonPhase = Moonphase.toUpperCase();

  return (
    <div className="sun-moon-section">
      <div className="moon-sun-heading">
        <WiHorizonAlt className="icon-heading" />
        <h3>SUN & MOON</h3>
      </div>
      <hr />
      <div className="sun-moon">
        <div className="sun">
          <div className="sun-arc" />
          <div className="sun-details details">
            <div className="sunrise">
              <WiSolarEclipse className="rise-icon sun-icons" />
              <div>{Sunrise}</div>
              <p className="rise">sunrise</p>
            </div>
            <div className="sunset set">
              <WiSolarEclipse className="set-icon sun-icons" />
              <div>{Sunset}</div>
              <p className="rise">sunset</p>
            </div>
          </div>
        </div>
        <div className="sun">
          <div className="sun-arc moon-arc" />
          <div className="sun-details details">
            <div className="sunrise">
              <WiMoonWaningCrescent1 className="rise-icon moon-icons" />
              <div>{Moonrise}</div>
              <p className="rise">moonrise</p>
            </div>
            <div className="sunset set">
              <WiMoonWaxingCrescent5 className="set-icon moon-icons" />
              <div>{Moonset}</div>
              <p className="rise">moonset</p>
            </div>
          </div>
        </div>
      </div>
      <div className="moon-phase">
        <p>MOON PHASE:</p>
        <p>{MoonPhase}</p>
      </div>
    </div>
  );
};

export default SunMoon;
