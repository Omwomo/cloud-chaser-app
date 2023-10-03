import React from 'react';
import { WiUmbrella } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { selectWeatherData } from '../redux/HomeSlice';
import '../styles/DailyForecastPrecip.css';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${dayOfWeek} \n ${month}/${dayOfMonth}`;
};

const DailyForecastPrecip = () => {
  const weatherData = useSelector(selectWeatherData);

  const { forecast } = weatherData;

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  const Precip = forecast.forecastday.map((precip) => Math.round(precip.day.totalprecip_mm * 7));
  // const ChanceOfRain = forecast.forecastday.map((chance) => chance.day.daily_chance_of_rain);
  const dailyLabels = forecast.forecastday.map((day) => formatDate(day.date));

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      foreColor: '#90A4AE',
    },
    plotOptions: {
      bar: {
        width: 50,
        borderRadius: 7,
        dataLabels: {
          position: 'top',
          offsetY: -20,
        },
      },
    },
    colors: ['#0004ff75'],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val}%`;
      },
      offsetY: -30,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },

    xaxis: {
      categories: dailyLabels,
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      max: 100,
      min: -10,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter(val) {
          return `${val}%`;
        },
      },

    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  const series = [{
    name: 'precip in mm',
    data: Precip,
  }];

  return (
    <div className="precip-forecast-section">
      <div className="precip-header">
        <WiUmbrella className="header-icon" />
        <p>PROBABILITY OF PRECIPITATION</p>
      </div>
      <hr />
      <div className="precip-details">
        <div className="precip">
          <ReactApexChart options={options} series={series} type="bar" height={250} width={650} />
        </div>
      </div>
    </div>
  );
};

export default DailyForecastPrecip;
