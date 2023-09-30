import React, { useEffect, useState } from 'react';
import { WiTime4 } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { selectWeatherData } from '../redux/HomeSlice';
import '../styles/HourlyForecast.css';

const HourlyForecast = () => {
  const weatherData = useSelector(selectWeatherData);
  const [iconPositions, setIconPositions] = useState([]);

  const { forecast } = weatherData;

  const hourlyLabels = forecast.forecastday[0].hour.map((hour) => {
    const date = new Date(hour.time);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  });

  useEffect(() => {
    if (weatherData) {
      const hourlyIcons = forecast.forecastday[0].hour.map((hour) => hour.condition.icon);

      setIconPositions(hourlyLabels.map((_, index) => index));

      const icons = hourlyIcons.map((icon, index) => (
        <img
          key={hourlyIcons.code}
          src={icon}
          className="hourly-icons"
          alt={`hourly-icon-${index}`}
          style={{ left: `${(index / (hourlyIcons.length + 1)) * 100}%` }}
        />
      ));

      setIconPositions(icons);
    }
  }, [weatherData, forecast.forecastday, hourlyLabels]);

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  const hourlyTemperatures = weatherData.forecast.forecastday[0].hour.map((hour) => `${hour.temp_c}°`);

  const options = {
    chart: {
      id: 'hourly-chart',
      stacked: false,
      fontFamily: 'Helvetica, Arial, sans-serif',
      foreColor: '#90A4AE',
    },
    xaxis: {
      categories: hourlyLabels,
    },
    yaxis: {
      max: 40,
      min: 0,
      labels: {
        show: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        return (
          `${val} °`
        );
      },
    },
    stroke: {
      curve: 'smooth',
      width: '1',
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 80,
      animateGradually: {
        enabled: true,
        delay: 1500,
      },
    },
  };

  const series = [
    {
      name: 'Temperature (°C)',
      data: hourlyTemperatures,
    },
  ];

  return (
    <div className="hourly-forecast-section">
      <div className="hourly-forecast-heading">
        <WiTime4 className="header-icon" />
        <h3>HOURLY FORECAST</h3>
      </div>
      <hr />
      <div className="hourly-forecast">
        <div className="overflow-div">
          <div className="hourly-icon">
            <div>
              {iconPositions.map((icon) => icon)}
            </div>
          </div>
          <div className="chart">
            <ReactApexChart options={options} series={series} type="area" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
