# Weather Forecasting Application

## Project Abstract

A modern, responsive weather forecasting application that provides real-time weather information for cities worldwide. The application features a clean user interface, 5-day weather forecasts, search history tracking, and user authentication. Built with React, Node.js, Express, and MongoDB, it demonstrates full-stack development capabilities and API integration.

## Features

### Core Features
- 🔍 Search weather by city name
- 🌡️ Current temperature display
- ☁️ Weather conditions with dynamic icons
- 💧 Humidity levels
- 💨 Wind speed
- 🌅 Sunrise & sunset times
- 📊 5-day weather forecast
- 📱 Responsive design for all devices
- ⚠️ Error handling for invalid inputs
- 📜 Search history storage

### Advanced Features
- 🔐 User authentication (JWT-based)
- ⭐ Favorite cities management
- 🌓 Dark/light mode toggle
- 📍 Geolocation-based weather
- 📈 Weather trends visualization
- 🔔 Weather alerts

## Technology Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Chart.js for data visualization
- CSS3 with responsive design
- LocalStorage for theme persistence

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled

### API
- OpenWeatherMap API

## Project Structure

```
weather-app/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Weather/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── CurrentWeather.jsx
│   │   │   │   ├── Forecast.jsx
│   │   │   │   └── WeatherCard.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── SearchHistory.jsx
│   │   │   │   └── FavoriteCities.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── Common/
│   │   │       ├── ThemeToggle.jsx
│   │   │       └── Loading.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── weatherService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── SearchHistory.js
│   │   └── FavoriteCity.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── weather.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── weatherController.js
│   │   └── userController.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenWeatherMap API key

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd weather-app
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_jwt_secret_key_here
OPENWEATHER_API_KEY=your_openweathermap_api_key
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

4. Start the frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Setup Guide

### Getting OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key to your `.env` files

### API Endpoints Used
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`
- Geolocation: `https://api.openweathermap.org/geo/1.0/direct`

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### SearchHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  city: String,
  country: String,
  searchedAt: Date,
  weatherData: Object
}
```

### FavoriteCity Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  city: String,
  country: String,
  addedAt: Date
}
```

## Usage Guide

1. **Register/Login**: Create an account or login to access all features
2. **Search Weather**: Enter a city name in the search bar
3. **View Details**: See current weather and 5-day forecast
4. **Add Favorites**: Click the star icon to save favorite cities
5. **View History**: Access your search history from the dashboard
6. **Toggle Theme**: Switch between light and dark modes
7. **Use Geolocation**: Click location icon for weather at your current location

## Deployment Guide

### Backend Deployment (Heroku)

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create new app:
```bash
cd backend
heroku create your-app-name
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set OPENWEATHER_API_KEY=your_key
```

5. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

**Using Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Run: `vercel`
4. Follow prompts and set environment variables

**Using Netlify:**
1. Build the app: `npm run build`
2. Drag and drop `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Database (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## Future Enhancements

- 🌍 Multi-language support
- 📧 Email weather alerts
- 🗺️ Interactive weather maps
- 📱 Progressive Web App (PWA)
- 🔔 Push notifications
- 📊 Advanced weather analytics
- 🌐 Social sharing features
- 🎨 Customizable themes
- 📍 Multiple location tracking
- 🤖 AI-based weather predictions

## Viva Questions & Answers

### Basic Questions

**Q1: What is the purpose of this project?**
A: To create a weather forecasting application that provides real-time weather data, forecasts, and user-friendly features like search history and favorites.

**Q2: Which API did you use and why?**
A: OpenWeatherMap API because it's free, reliable, well-documented, and provides comprehensive weather data including current conditions and forecasts.

**Q3: What is the technology stack?**
A: Frontend: React.js, Backend: Node.js with Express, Database: MongoDB, API: OpenWeatherMap

**Q4: How does authentication work?**
A: JWT (JSON Web Tokens) based authentication. User credentials are verified, and a token is generated and stored in localStorage for subsequent requests.

**Q5: What is the difference between weather and forecast?**
A: Weather shows current conditions, while forecast shows predicted conditions for upcoming days (5-day forecast in our app).

### Technical Questions

**Q6: How do you handle API rate limits?**
A: Implement caching, store recent searches, limit requests per user, and use efficient API calls.

**Q7: Explain the database schema.**
A: Three collections: Users (authentication), SearchHistory (tracks searches), and FavoriteCities (stores user favorites).

**Q8: How is password security maintained?**
A: Passwords are hashed using bcrypt before storing in database, never stored in plain text.

**Q9: What is CORS and why is it needed?**
A: Cross-Origin Resource Sharing allows frontend (port 3000) to communicate with backend (port 5000) on different origins.

**Q10: How does dark mode work?**
A: Using React Context API to manage theme state, CSS variables for colors, and localStorage for persistence.

### Advanced Questions

**Q11: How would you optimize API calls?**
A: Implement debouncing on search, cache results, use service workers, and implement request batching.

**Q12: How do you handle errors?**
A: Try-catch blocks, error boundaries in React, proper HTTP status codes, and user-friendly error messages.

**Q13: Explain the component structure.**
A: Modular components: Auth (login/register), Weather (display), Dashboard (history/favorites), Layout (header/footer), Common (reusable).

**Q14: How would you scale this application?**
A: Use Redis for caching, implement load balancing, use CDN for static assets, optimize database queries, and implement microservices.

**Q15: What security measures are implemented?**
A: JWT authentication, password hashing, input validation, CORS configuration, environment variables for secrets, and HTTPS in production.

## Screenshots & UI Design

### Recommended Color Scheme

**Light Mode:**
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Background: #F9FAFB
- Text: #1F2937

**Dark Mode:**
- Primary: #60A5FA
- Secondary: #34D399
- Background: #111827
- Text: #F9FAFB

### Key UI Elements
- Clean search bar with autocomplete
- Weather cards with gradient backgrounds
- Animated weather icons
- Responsive grid layout
- Smooth transitions and hover effects
- Mobile-first design approach

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for learning and portfolio purposes.

## Contact & Support

For questions or support, please open an issue in the repository.

---

**Made with ❤️ for learning and demonstration purposes**
