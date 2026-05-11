/**
 * Weather Controller
 * Handles weather data fetching and processing
 */

const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * @desc    Get current weather by city name
 * @route   GET /api/weather/current/:city
 * @access  Private
 */
const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name'
      });
    }

    // Fetch current weather from OpenWeatherMap
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    const data = response.data;

    // Format weather data
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      dt: data.dt
    };

    // Save to search history if user is authenticated
    if (req.user) {
      await SearchHistory.addSearch(req.user.id, {
        city: weatherData.city,
        country: weatherData.country,
        coordinates: weatherData.coordinates,
        weatherData: {
          temperature: weatherData.temperature,
          condition: weatherData.condition,
          icon: weatherData.icon,
          humidity: weatherData.humidity,
          windSpeed: weatherData.windSpeed,
          pressure: weatherData.pressure
        }
      });
    }

    res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Get current weather error:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found. Please check the spelling and try again.'
      });
    }

    if (error.response && error.response.status === 401) {
      return res.status(502).json({
        success: false,
        message: 'Invalid OpenWeather API key. Please update OPENWEATHER_API_KEY in backend/.env.',
        error: error.response.data?.message || error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

/**
 * @desc    Get 5-day weather forecast
 * @route   GET /api/weather/forecast/:city
 * @access  Private
 */
const getForecast = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name'
      });
    }

    // Fetch 5-day forecast from OpenWeatherMap
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;

    // Process forecast data - get one forecast per day at noon
    const dailyForecasts = [];
    const processedDates = new Set();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const hour = new Date(item.dt * 1000).getHours();

      // Get forecast around noon (12:00) for each day
      if (!processedDates.has(date) && hour >= 11 && hour <= 13) {
        processedDates.add(date);
        dailyForecasts.push({
          date: item.dt,
          dateString: date,
          temperature: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          windSpeed: item.wind.speed,
          clouds: item.clouds.all,
          pop: Math.round(item.pop * 100) // Probability of precipitation
        });
      }
    });

    // If we don't have 5 days, fill with available data
    if (dailyForecasts.length < 5) {
      const remainingDays = 5 - dailyForecasts.length;
      for (let i = 0; i < remainingDays && i < data.list.length; i++) {
        const item = data.list[i * 8]; // Every 8th item is roughly 24 hours apart
        if (item) {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!processedDates.has(date)) {
            processedDates.add(date);
            dailyForecasts.push({
              date: item.dt,
              dateString: date,
              temperature: Math.round(item.main.temp),
              tempMin: Math.round(item.main.temp_min),
              tempMax: Math.round(item.main.temp_max),
              condition: item.weather[0].main,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              windSpeed: item.wind.speed,
              clouds: item.clouds.all,
              pop: Math.round(item.pop * 100)
            });
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        city: data.city.name,
        country: data.city.country,
        forecast: dailyForecasts.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('Get forecast error:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found. Please check the spelling and try again.'
      });
    }

    if (error.response && error.response.status === 401) {
      return res.status(502).json({
        success: false,
        message: 'Invalid OpenWeather API key. Please update OPENWEATHER_API_KEY in backend/.env.',
        error: error.response.data?.message || error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching forecast data',
      error: error.message
    });
  }
};

/**
 * @desc    Get weather by coordinates (for geolocation)
 * @route   GET /api/weather/coordinates
 * @access  Private
 */
const getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude'
      });
    }

    // Fetch weather by coordinates
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;

    const weatherData = {
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      dt: data.dt
    };

    res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Get weather by coordinates error:', error.message);

    if (error.response && error.response.status === 401) {
      return res.status(502).json({
        success: false,
        message: 'Invalid OpenWeather API key. Please update OPENWEATHER_API_KEY in backend/.env.',
        error: error.response.data?.message || error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates
};
