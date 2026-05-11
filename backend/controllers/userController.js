/**
 * User Controller
 * Handles user-related operations like favorites and search history
 */

const SearchHistory = require('../models/SearchHistory');
const FavoriteCity = require('../models/FavoriteCity');

/**
 * @desc    Get user's search history
 * @route   GET /api/user/history
 * @access  Private
 */
const getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user.id })
      .sort({ searchedAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search history',
      error: error.message
    });
  }
};

/**
 * @desc    Clear search history
 * @route   DELETE /api/user/history
 * @access  Private
 */
const clearSearchHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({ userId: req.user.id });

    res.status(200).json({
      success: true,
      message: 'Search history cleared successfully'
    });
  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing search history',
      error: error.message
    });
  }
};

/**
 * @desc    Get user's favorite cities
 * @route   GET /api/user/favorites
 * @access  Private
 */
const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteCity.find({ userId: req.user.id })
      .sort({ addedAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message
    });
  }
};

/**
 * @desc    Add city to favorites
 * @route   POST /api/user/favorites
 * @access  Private
 */
const addFavorite = async (req, res) => {
  try {
    const { city, country, coordinates } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name'
      });
    }

    // Check if already in favorites
    const existingFavorite = await FavoriteCity.findOne({
      userId: req.user.id,
      city: city
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'City already in favorites'
      });
    }

    const favorite = await FavoriteCity.create({
      userId: req.user.id,
      city,
      country,
      coordinates
    });

    res.status(201).json({
      success: true,
      message: 'City added to favorites',
      data: favorite
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    
    if (error.message === 'Maximum 10 favorite cities allowed') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding favorite',
      error: error.message
    });
  }
};

/**
 * @desc    Remove city from favorites
 * @route   DELETE /api/user/favorites/:id
 * @access  Private
 */
const removeFavorite = async (req, res) => {
  try {
    const favorite = await FavoriteCity.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    await favorite.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Favorite removed successfully'
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing favorite',
      error: error.message
    });
  }
};

module.exports = {
  getSearchHistory,
  clearSearchHistory,
  getFavorites,
  addFavorite,
  removeFavorite
};
