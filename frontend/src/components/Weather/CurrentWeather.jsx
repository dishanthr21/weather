/**
 * Current Weather Component
 * Displays current weather information for a city
 */

import React from 'react';
import {
  formatTime,
  getWeatherIcon,
  getWeatherEmoji,
  getWindDirection,
  capitalize
} from '../../utils/helpers';
import './CurrentWeather.css';

const CurrentWeather = ({ weather, onAddFavorite, isFavorite }) => {
  if (!weather) return null;

  return (
    <div className="current-weather fade-in">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">
            {weather.city}, {weather.country}
          </h2>
          <p className="weather-description">
            {getWeatherEmoji(weather.condition)} {capitalize(weather.description)}
          </p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={onAddFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img
            src={getWeatherIcon(weather.icon)}
            alt={weather.condition}
            className="weather-icon-large"
          />
          <div className="temperature-info">
            <div className="temperature">{weather.temperature}°C</div>
            <div className="feels-like">Feels like {weather.feelsLike}°C</div>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-card">
            <span className="detail-icon">💧</span>
            <div className="detail-info">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weather.humidity}%</div>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">💨</span>
            <div className="detail-info">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">
                {weather.windSpeed} m/s {getWindDirection(weather.windDeg)}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">🌡️</span>
            <div className="detail-info">
              <div className="detail-label">Pressure</div>
              <div className="detail-value">{weather.pressure} hPa</div>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">👁️</span>
            <div className="detail-info">
              <div className="detail-label">Visibility</div>
              <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">🌅</span>
            <div className="detail-info">
              <div className="detail-label">Sunrise</div>
              <div className="detail-value">{formatTime(weather.sunrise)}</div>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">🌇</span>
            <div className="detail-info">
              <div className="detail-label">Sunset</div>
              <div className="detail-value">{formatTime(weather.sunset)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
