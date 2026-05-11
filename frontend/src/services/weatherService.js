/**
 * Weather Service
 * API calls for weather-related operations
 */

import api from './api';

const weatherService = {
  // Get current weather by city name
  getCurrentWeather: async (city) => {
    try {
      const encodedCity = encodeURIComponent(city);
      const response = await api.get(`/weather/current/${encodedCity}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get 5-day forecast
  getForecast: async (city) => {
    try {
      const encodedCity = encodeURIComponent(city);
      const response = await api.get(`/weather/forecast/${encodedCity}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get weather by coordinates (geolocation)
  getWeatherByCoordinates: async (lat, lon) => {
    try {
      const response = await api.get(`/weather/coordinates?lat=${lat}&lon=${lon}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get search history
  getSearchHistory: async () => {
    try {
      const response = await api.get('/user/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Clear search history
  clearSearchHistory: async () => {
    try {
      const response = await api.delete('/user/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get favorite cities
  getFavorites: async () => {
    try {
      const response = await api.get('/user/favorites');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add city to favorites
  addFavorite: async (city, country, coordinates) => {
    try {
      const response = await api.post('/user/favorites', {
        city,
        country,
        coordinates
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove city from favorites
  removeFavorite: async (id) => {
    try {
      const response = await api.delete(`/user/favorites/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default weatherService;
