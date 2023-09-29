import React from 'react';
import { WiSolarEclipse } from 'react-icons/wi';
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
        <h3>SUN & MOON</h3>
      </div>
      <hr />
      <div className="sun-moon">
        <div className="sun">
          <div className="sun-arc" />
          <div className="sun-details details">
            <div className="sunrise rise">
              <WiSolarEclipse className="rise-icon sun-icons" />
              <div>{Sunrise}</div>
            </div>
            <div className="sunset set">
              <WiSolarEclipse className="set-icon sun-icons" />
              <div>{Sunset}</div>
            </div>
          </div>
        </div>
        <div className="sun">
          <div className="sun-arc" />
          <div className="sun-details details">
            <div className="sunrise rise">
              <WiSolarEclipse className="rise-icon sun-icons" />
              <div>{Moonrise}</div>
            </div>
            <div className="sunset set">
              <WiSolarEclipse className="set-icon sun-icons" />
              <div>{Moonset}</div>
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
