/**
 * Favorite Cities Component
 * Displays user's favorite cities
 */

import React from 'react';
import './FavoriteCities.css';

const FavoriteCities = ({ favorites, onSelectCity, onRemoveFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">⭐</span>
        <p className="empty-text">No favorite cities yet</p>
        <p className="empty-subtext">Add cities to your favorites for quick access</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      {favorites.map((favorite) => (
        <div key={favorite._id} className="favorite-item">
          <button
            className="favorite-city-btn"
            onClick={() => onSelectCity(favorite.city)}
          >
            <span className="favorite-city-name">
              {favorite.city}, {favorite.country}
            </span>
            <span className="favorite-arrow">→</span>
          </button>
          <button
            className="remove-favorite-btn"
            onClick={() => onRemoveFavorite(favorite._id)}
            title="Remove from favorites"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCities;
