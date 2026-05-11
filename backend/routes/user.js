/**
 * User Routes
 * Handles user-related operations like favorites and search history
 */

const express = require('express');
const router = express.Router();
const {
  getSearchHistory,
  clearSearchHistory,
  getFavorites,
  addFavorite,
  removeFavorite
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// All user routes are protected (require authentication)

// Search history routes
router.get('/history', protect, getSearchHistory);
router.delete('/history', protect, clearSearchHistory);

// Favorites routes
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete('/favorites/:id', protect, removeFavorite);

module.exports = router;
