import React, { useEffect, useState } from 'react';
import { WiThermometer } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { selectWeatherData } from '../redux/HomeSlice';
import { formatDate } from './DailyForecastPrecip';
import '../styles/DailyForecastTemp.css';

const DailyForecastTemp = () => {
  const weatherData = useSelector(selectWeatherData);
  const [iconPositions, setIconPositions] = useState([]);
  const [conditionPositions, setConditionsPosition] = useState([]);

  const { forecast } = weatherData;

  const minTemp = forecast.forecastday.map((day) => day.day.mintemp_c);
  const maxTemp = forecast.forecastday.map((day) => day.day.maxtemp_c);

  const dailyLabels = forecast.forecastday.map((hour) => formatDate(hour.date));

  useEffect(() => {
    if (weatherData) {
      const dailyIcons = forecast.forecastday.map((icons) => icons.day.condition.icon);

      setIconPositions(dailyLabels.map((_, index) => index));

      const icons = dailyIcons.map((icon, index) => (
        <img
          key={dailyIcons.code}
          src={icon}
          className="daily-icons"
          alt={`hourly-icon-${index}`}
          style={{ left: `${(index / (dailyIcons.length + 1)) * 100}%` }}
        />
      ));

      const dailyConditions = forecast.forecastday.map((d) => d.day.condition.text);
      setConditionsPosition(dailyLabels.map((_, index) => index));

      const conditions = dailyConditions.map((condition, index) => (
        <div
          className="daily-conditions"
          key={dailyConditions.code}
          style={{ left: `${(index / (dailyConditions.length - 1)) * 90}%` }}
        >
          {condition}
        </div>
      ));

      setIconPositions(icons);
      setConditionsPosition(conditions);
    }
  }, [weatherData]);

  if (!weatherData) return null;

  const options = {
    chart: {
      id: 'daily-temp-chart',
      stacked: false,
      fontFamily: 'Helvetica, Arial, sans-serif',
      foreColor: '#90A4AE',
    },
    xaxis: {
      categories: dailyLabels,
    },
    yaxis: {
      max: 40,
      min: 0,
      labels: {
        show: false,
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
    colors: ['#2E93fA', '#da1212e3'],
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  const series = [
    {
      name: 'Minimum Temperature (°C)',
      data: minTemp,
    },
    {
      name: 'Maximum Temperature (°C)',
      data: maxTemp,
    },
  ];

  return (
    <div className="daily-forecast-section">
      <div className="daily-forecast-heading">
        <WiThermometer className="header-icon" />
        <h3>DAILY FORECAST</h3>
      </div>
      <hr />
      <div className="daily-forecast">
        <div className="overflow-div2">
          <div className="daily-condition">
            <div>
              {conditionPositions.map((condition) => condition)}
            </div>
          </div>
          <div className="daily-icon">
            <div>
              {iconPositions.map((icon) => icon)}
            </div>
          </div>
          <div className="chart">
            <ReactApexChart options={options} series={series} type="area" height={280} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyForecastTemp;
