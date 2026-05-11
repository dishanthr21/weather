/**
 * Helper Utilities
 * Common utility functions used across the application
 */

/**
 * Format Unix timestamp to readable time
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format Unix timestamp to readable date
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Get weather icon emoji based on condition
 */
export const getWeatherEmoji = (condition) => {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌫️',
    'Dust': '💨',
    'Fog': '🌫️',
    'Sand': '💨',
    'Ash': '🌋',
    'Squall': '💨',
    'Tornado': '🌪️'
  };
  return emojiMap[condition] || '🌤️';
};

/**
 * Convert wind degree to direction
 */
export const getWindDirection = (degree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

/**
 * Get temperature color based on value
 */
export const getTemperatureColor = (temp) => {
  if (temp <= 0) return '#60A5FA'; // Blue
  if (temp <= 10) return '#34D399'; // Green
  if (temp <= 20) return '#FBBF24'; // Yellow
  if (temp <= 30) return '#F59E0B'; // Orange
  return '#EF4444'; // Red
};

/**
 * Capitalize first letter of each word
 */
export const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

/**
 * Debounce function for search input
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Get background gradient based on weather condition
 */
export const getWeatherGradient = (condition) => {
  const gradients = {
    'Clear': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Clouds': 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
    'Rain': 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)',
    'Drizzle': 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
    'Thunderstorm': 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
    'Snow': 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)',
    'Mist': 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    'Fog': 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)'
  };
  return gradients[condition] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};
