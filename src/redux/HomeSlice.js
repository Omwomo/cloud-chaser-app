import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    location: null,
    weatherData: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const { setLocation, setWeatherData } = weatherSlice.actions;
export const selectLocation = (state) => state.weather.location;
export const selectWeatherData = (state) => state.weather.weatherData;
export default weatherSlice.reducer;
