import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './HomeSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
