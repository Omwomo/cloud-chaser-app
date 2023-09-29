import React from 'react';
import { WiStrongWind } from 'react-icons/wi';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectWeatherData } from '../redux/HomeSlice';
import '../styles/Wind.css';

const Wind = () => {
  const weatherData = useSelector(selectWeatherData);

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  const { current } = weatherData;

  const windDegree = Math.round(current.wind_degree * 0.28);
  const windDegreeDisplay = current.wind_degree;
  const windDirection = current.wind_dir;

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      foreColor: '#90A4AE',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            show: false,
          },
          name: {
            show: true,
            offsetY: 1,
            color: '#fff',
            fontSize: '1.5rem',
          },
        },
        track: {
          show: false,
        },
      },
    },
    labels: [`${windDegreeDisplay}  °  ${windDirection}`],
  };

  const series = [windDegree];

  return (
    <div className="wind-section">
      <div className="wind-header">
        <WiStrongWind className="header-icon" />
        <h3>WIND</h3>
      </div>
      <hr />
      <div className="wind-details">
        <div className="wind-degree">
          <p className="shd">DIRECTION</p>
          <ReactApexChart options={options} series={series} type="radialBar" height={200} />
        </div>
        <div className="s">
          <p className="sp shd">SPEED</p>
          <div className="other-wind-details">
            <div className="wind wind1">
              <hr className="wind-line" />
              <p>{current.wind_mph}</p>
              <p>mph</p>
            </div>
            <div className="wind">
              <hr className="wind-line" />
              <p>{current.wind_kph}</p>
              <p>kph</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wind;
