import { setWeatherData } from './HomeSlice';

const API_KEY = '10face67f7074b8fad7120709231709';

const fetchWeatherData = (query) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=10&aqi=no&alerts=no`,
    // http://api.weatherapi.com/v1/forecast.json?key=10face67f7074b8fad7120709231709&q=London&days=3&aqi=no&alerts=no
    );

    const data = await response.json();

    dispatch(setWeatherData(data));
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
};

export default fetchWeatherData;
