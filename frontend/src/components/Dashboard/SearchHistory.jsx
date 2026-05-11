/**
 * Search History Component
 * Displays user's recent weather searches
 */

import React from 'react';
import { getRelativeTime, getWeatherEmoji } from '../../utils/helpers';
import './SearchHistory.css';

const SearchHistory = ({ history, onSelectCity, onClearHistory }) => {
  if (!history || history.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📜</span>
        <p className="empty-text">No search history</p>
        <p className="empty-subtext">Your recent searches will appear here</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h4 className="history-title">Recent Searches</h4>
        <button className="clear-history-btn" onClick={onClearHistory}>
          Clear All
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <button
            key={item._id}
            className="history-item"
            onClick={() => onSelectCity(item.city)}
          >
            <div className="history-item-main">
              <span className="history-emoji">
                {getWeatherEmoji(item.weatherData?.condition)}
              </span>
              <div className="history-info">
                <div className="history-city">
                  {item.city}, {item.country}
                </div>
                <div className="history-details">
                  {item.weatherData?.temperature}°C • {item.weatherData?.condition}
                </div>
              </div>
            </div>
            <div className="history-time">
              {getRelativeTime(item.searchedAt)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
