/**
 * Forecast Component
 * Displays 5-day weather forecast
 */

import React from 'react';
import { formatDate, getWeatherIcon, capitalize } from '../../utils/helpers';
import './Forecast.css';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.length) return null;

  return (
    <div className="forecast-container fade-in">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{formatDate(day.date)}</div>
            <img
              src={getWeatherIcon(day.icon)}
              alt={day.condition}
              className="forecast-icon"
            />
            <div className="forecast-condition">{capitalize(day.description)}</div>
            <div className="forecast-temp">
              <span className="temp-max">{day.tempMax}°</span>
              <span className="temp-separator">/</span>
              <span className="temp-min">{day.tempMin}°</span>
            </div>
            <div className="forecast-details">
              <div className="forecast-detail">
                <span>💧 {day.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span>💨 {day.windSpeed} m/s</span>
              </div>
              {day.pop > 0 && (
                <div className="forecast-detail">
                  <span>🌧️ {day.pop}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
