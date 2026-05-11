/**
 * Dashboard Component
 * Main application dashboard with weather display and features
 */

import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header';
import SearchBar from '../Weather/SearchBar';
import CurrentWeather from '../Weather/CurrentWeather';
import Forecast from '../Weather/Forecast';
import SearchHistory from './SearchHistory';
import FavoriteCities from './FavoriteCities';
import Loading from '../Common/Loading';
import weatherService from '../../services/weatherService';
import './Dashboard.css';

const Dashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('weather');

  // Load initial data
  useEffect(() => {
    loadSearchHistory();
    loadFavorites();
    // Load default city weather
    searchWeather('London');
  }, []);

  const searchWeather = async (city) => {
    setLoading(true);
    setError('');

    try {
      // Get current weather
      const weatherResponse = await weatherService.getCurrentWeather(city);
      setCurrentWeather(weatherResponse.data);

      // Get forecast
      const forecastResponse = await weatherService.getForecast(city);
      setForecast(forecastResponse.data.forecast);

      // Reload search history
      await loadSearchHistory();
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
      }
      console.error('Search weather error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError('');

    try {
      const response = await weatherService.getWeatherByCoordinates(lat, lon);
      setCurrentWeather(response.data);

      // Get forecast for the city
      if (response.data.city) {
        const forecastResponse = await weatherService.getForecast(response.data.city);
        setForecast(forecastResponse.data.forecast);
      }

      await loadSearchHistory();
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
      }
      console.error('Search by coordinates error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const response = await weatherService.getSearchHistory();
      setSearchHistory(response.data);
    } catch (err) {
      console.error('Load search history error:', err);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await weatherService.getFavorites();
      setFavorites(response.data);
    } catch (err) {
      console.error('Load favorites error:', err);
    }
  };

  const handleAddFavorite = async () => {
    if (!currentWeather) return;

    try {
      const isFav = isFavorite();
      
      if (isFav) {
        // Remove from favorites
        const favorite = favorites.find(f => f.city === currentWeather.city);
        if (favorite) {
          await weatherService.removeFavorite(favorite._id);
        }
      } else {
        // Add to favorites
        await weatherService.addFavorite(
          currentWeather.city,
          currentWeather.country,
          currentWeather.coordinates
        );
      }

      await loadFavorites();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update favorites');
      console.error('Add favorite error:', err);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await weatherService.removeFavorite(id);
      await loadFavorites();
    } catch (err) {
      alert('Failed to remove favorite');
      console.error('Remove favorite error:', err);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      try {
        await weatherService.clearSearchHistory();
        await loadSearchHistory();
      } catch (err) {
        alert('Failed to clear history');
        console.error('Clear history error:', err);
      }
    }
  };

  const isFavorite = () => {
    if (!currentWeather) return false;
    return favorites.some(f => f.city === currentWeather.city);
  };

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SearchBar
            onSearch={searchWeather}
            onGeolocation={searchWeatherByCoordinates}
            loading={loading}
          />

          {error && (
            <div className="error-banner fade-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {loading && <Loading message="Fetching weather data..." />}

          {!loading && currentWeather && (
            <>
              <CurrentWeather
                weather={currentWeather}
                onAddFavorite={handleAddFavorite}
                isFavorite={isFavorite()}
              />
              <Forecast forecast={forecast} />
            </>
          )}
        </div>

        <div className="dashboard-sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
              onClick={() => setActiveTab('weather')}
            >
              ⭐ Favorites
            </button>
            <button
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              📜 History
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === 'weather' && (
              <FavoriteCities
                favorites={favorites}
                onSelectCity={searchWeather}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
            {activeTab === 'history' && (
              <SearchHistory
                history={searchHistory}
                onSelectCity={searchWeather}
                onClearHistory={handleClearHistory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
