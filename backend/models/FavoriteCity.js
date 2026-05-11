/**
 * Favorite City Model
 * Stores user's favorite cities for quick access
 */

const mongoose = require('mongoose');

const favoriteCitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  coordinates: {
    lat: Number,
    lon: Number
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique city per user
favoriteCitySchema.index({ userId: 1, city: 1 }, { unique: true });

// Limit to 10 favorite cities per user
favoriteCitySchema.pre('save', async function(next) {
  const count = await this.constructor.countDocuments({ userId: this.userId });
  if (count >= 10) {
    const error = new Error('Maximum 10 favorite cities allowed');
    error.statusCode = 400;
    return next(error);
  }
  next();
});

module.exports = mongoose.model('FavoriteCity', favoriteCitySchema);
