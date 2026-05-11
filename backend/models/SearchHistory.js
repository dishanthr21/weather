/**
 * Search History Model
 * Stores user's weather search history
 */

const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
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
  weatherData: {
    temperature: Number,
    condition: String,
    icon: String,
    humidity: Number,
    windSpeed: Number,
    pressure: Number
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
searchHistorySchema.index({ userId: 1, searchedAt: -1 });

// Limit search history to last 50 entries per user
searchHistorySchema.statics.addSearch = async function(userId, searchData) {
  // Add new search
  const search = await this.create({
    userId,
    ...searchData
  });

  // Keep only last 50 searches
  const count = await this.countDocuments({ userId });
  if (count > 50) {
    const oldSearches = await this.find({ userId })
      .sort({ searchedAt: 1 })
      .limit(count - 50);
    
    const idsToDelete = oldSearches.map(s => s._id);
    await this.deleteMany({ _id: { $in: idsToDelete } });
  }

  return search;
};

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
