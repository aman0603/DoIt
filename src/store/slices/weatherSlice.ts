import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, WeatherData, AppThunk } from '../../types';

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;

export const fetchWeather = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchWeatherStart());
    // const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Noida&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    dispatch(fetchWeatherSuccess({
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    }));
  } catch (error) {
    dispatch(fetchWeatherFailure(error instanceof Error ? error.message : 'Failed to fetch weather'));
  }
};

export default weatherSlice.reducer;