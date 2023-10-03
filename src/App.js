import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SiApachecloudstack } from 'react-icons/si';
import { setLocation, setWeatherData } from './redux/HomeSlice';
import WeatherDisplay from './components/weatherDisplay';
import SearchBar from './components/searchBar';
import fetchWeatherData from './redux/weatherActions';
import CityList from './components/cityList';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch weather data based on IP address
    const getIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();

        dispatch(setLocation(data.ip));

        if (data.ip) {
          dispatch(fetchWeatherData('auto:ip'));
        }
      } catch (error) {
        throw new Error('Error fetching IP address:', error);
      }
    };

    getIPAddress();
  }, [dispatch]);

  const handleSearch = (query) => {
    if (query.trim()) {
      dispatch(setWeatherData(null));
      dispatch(fetchWeatherData(query));
    }
  };

  return (
    <div className="App">
      <div className="nav">
        <div className="intro">
          <SiApachecloudstack className="logo" />
          <h1>CLOUD CHASER</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <WeatherDisplay />
      <CityList />
      <div className="footer">
        <p>All rights reserved @Omwomo</p>
      </div>
    </div>
  );
};

export default App;
