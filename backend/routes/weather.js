/**
 * Weather Routes
 * Handles weather data fetching endpoints
 */

const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates
} = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

// All weather routes are protected (require authentication)
router.get('/current/:city', protect, getCurrentWeather);
router.get('/forecast/:city', protect, getForecast);
router.get('/coordinates', protect, getWeatherByCoordinates);

module.exports = router;
