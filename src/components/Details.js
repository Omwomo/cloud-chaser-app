import React from 'react';
import { useSelector } from 'react-redux';
import {
  WiUmbrella, WiDaySunny, WiHumidity, WiCloud, WiDirectionDown, WiStars,
} from 'react-icons/wi';
import { selectWeatherData } from '../redux/HomeSlice';
import '../styles/Details.css';

const Details = () => {
  const weatherData = useSelector(selectWeatherData);

  if (!weatherData) return null;

  const { current } = weatherData;

  return (
    <div className="detail">
      <div className="details-heading">
        <p>DETAILS</p>
      </div>
      <hr />
      <div className="details">
        <div className="pressure details-grid">
          <div className="line">
            <div className="grid-details">
              <WiDirectionDown className="icons" />
              <p className="detail-name">Pressure</p>
              <p>{current.pressure_mb}</p>
            </div>
          </div>
        </div>
        <hr className="vertical-line" />
        <div className="humidity details-grid">
          <div className="line">
            <div className="grid-details">
              <WiHumidity className="icons" />
              <p className="detail-name">Humidity</p>
              <p>{current.humidity}</p>
            </div>
          </div>
        </div>
        <hr className="vertical-line" />
        <div className="precipitation details-grid">
          <div className="grid-details">
            <WiUmbrella className="icons" />
            <p className="detail-name">Precipitation</p>
            <p>{current.precip_mm}</p>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <div className="details">
        <div className="visibility details-grid">
          <div className="line">
            <div className="grid-details">
              <WiStars className="icons" />
              <p className="detail-name">Visibility</p>
              <p>{current.vis_km}</p>
            </div>
          </div>
        </div>
        <hr className="vertical-line" />
        <div className="uv-index details-grid">
          <div className="line">
            <div className="grid-details">
              <WiDaySunny className="icons" />
              <p className="detail-name">UV Index</p>
              <p>{current.uv}</p>
            </div>
          </div>
        </div>
        <hr className="vertical-line" />
        <div className="cloud-cover details-grid">
          <div className="grid-details">
            <WiCloud className="icons" />
            <p className="detail-name">Cloud Cover</p>
            <p>{current.cloud}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
