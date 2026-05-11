/**
 * Search Bar Component
 * Input field for searching weather by city name
 */

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onGeolocation, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onGeolocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary search-btn"
          disabled={loading || !city.trim()}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-secondary location-btn"
          onClick={handleGeolocation}
          disabled={loading}
          title="Use my location"
        >
          📍
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
