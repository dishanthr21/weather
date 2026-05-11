# Project Structure

Complete file and folder structure of the Weather Forecasting Application.

```
weather-app/
│
├── README.md                          # Main project documentation
├── PROJECT_ABSTRACT.md                # Academic project abstract
├── SETUP_INSTRUCTIONS.md              # Detailed setup guide
├── QUICK_START.md                     # Quick start guide
├── DEPLOYMENT_GUIDE.md                # Production deployment guide
├── PROJECT_STRUCTURE.md               # This file
├── .gitignore                         # Git ignore rules
│
├── backend/                           # Backend Node.js/Express application
│   ├── config/
│   │   └── db.js                      # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js          # Authentication logic (register, login)
│   │   ├── weatherController.js       # Weather data fetching logic
│   │   └── userController.js          # User operations (favorites, history)
│   │
│   ├── middleware/
│   │   └── auth.js                    # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── User.js                    # User schema and model
│   │   ├── SearchHistory.js           # Search history schema
│   │   └── FavoriteCity.js            # Favorite cities schema
│   │
│   ├── routes/
│   │   ├── auth.js                    # Authentication routes
│   │   ├── weather.js                 # Weather API routes
│   │   └── user.js                    # User data routes
│   │
│   ├── server.js                      # Main server entry point
│   ├── package.json                   # Backend dependencies
│   ├── .env.example                   # Environment variables template
│   ├── .env                           # Environment variables (not in git)
│   └── .gitignore                     # Backend-specific git ignore
│
└── frontend/                          # Frontend React application
    ├── public/
    │   ├── index.html                 # HTML template
    │   ├── manifest.json              # PWA manifest
    │   └── favicon.ico                # App icon
    │
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx          # Login component
    │   │   │   ├── Register.jsx       # Registration component
    │   │   │   └── Auth.css           # Auth styles
    │   │   │
    │   │   ├── Common/
    │   │   │   ├── Loading.jsx        # Loading spinner component
    │   │   │   ├── Loading.css        # Loading styles
    │   │   │   ├── ThemeToggle.jsx    # Dark/light mode toggle
    │   │   │   ├── ThemeToggle.css    # Theme toggle styles
    │   │   │   └── PrivateRoute.jsx   # Protected route wrapper
    │   │   │
    │   │   ├── Dashboard/
    │   │   │   ├── Dashboard.jsx      # Main dashboard component
    │   │   │   ├── Dashboard.css      # Dashboard styles
    │   │   │   ├── SearchHistory.jsx  # Search history component
    │   │   │   ├── SearchHistory.css  # History styles
    │   │   │   ├── FavoriteCities.jsx # Favorites component
    │   │   │   └── FavoriteCities.css # Favorites styles
    │   │   │
    │   │   ├── Layout/
    │   │   │   ├── Header.jsx         # App header/navbar
    │   │   │   └── Header.css         # Header styles
    │   │   │
    │   │   └── Weather/
    │   │       ├── SearchBar.jsx      # City search input
    │   │       ├── SearchBar.css      # Search bar styles
    │   │       ├── CurrentWeather.jsx # Current weather display
    │   │       ├── CurrentWeather.css # Current weather styles
    │   │       ├── Forecast.jsx       # 5-day forecast display
    │   │       └── Forecast.css       # Forecast styles
    │   │
    │   ├── context/
    │   │   ├── AuthContext.jsx        # Authentication context provider
    │   │   └── ThemeContext.jsx       # Theme context provider
    │   │
    │   ├── services/
    │   │   ├── api.js                 # Axios instance configuration
    │   │   └── weatherService.js      # Weather API service functions
    │   │
    │   ├── utils/
    │   │   └── helpers.js             # Utility functions
    │   │
    │   ├── App.jsx                    # Main App component
    │   ├── App.css                    # App-level styles
    │   ├── index.js                   # React entry point
    │   └── index.css                  # Global styles
    │
    ├── package.json                   # Frontend dependencies
    ├── .env.example                   # Environment variables template
    ├── .env                           # Environment variables (not in git)
    └── .gitignore                     # Frontend-specific git ignore
```

## File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation with features, setup, and usage |
| `PROJECT_ABSTRACT.md` | Academic abstract for college submissions |
| `SETUP_INSTRUCTIONS.md` | Detailed step-by-step setup guide |
| `QUICK_START.md` | Quick 5-minute setup guide |
| `DEPLOYMENT_GUIDE.md` | Production deployment instructions |
| `PROJECT_STRUCTURE.md` | This file - project structure documentation |
| `.gitignore` | Files and folders to exclude from git |

### Backend Structure

#### Configuration (`backend/config/`)
- **db.js**: MongoDB connection setup using Mongoose

#### Controllers (`backend/controllers/`)
- **authController.js**: Handles user registration, login, and profile
- **weatherController.js**: Fetches weather data from OpenWeatherMap API
- **userController.js**: Manages favorites and search history

#### Middleware (`backend/middleware/`)
- **auth.js**: JWT token verification for protected routes

#### Models (`backend/models/`)
- **User.js**: User schema with password hashing
- **SearchHistory.js**: Search history schema with auto-cleanup
- **FavoriteCity.js**: Favorite cities schema with 10-city limit

#### Routes (`backend/routes/`)
- **auth.js**: `/api/auth/*` endpoints
- **weather.js**: `/api/weather/*` endpoints
- **user.js**: `/api/user/*` endpoints

#### Main Files
- **server.js**: Express server setup, middleware, and error handling
- **package.json**: Dependencies and scripts
- **.env**: Environment variables (API keys, database URI)

### Frontend Structure

#### Components

**Auth Components** (`frontend/src/components/Auth/`)
- Login and registration forms with validation

**Common Components** (`frontend/src/components/Common/`)
- Reusable components: Loading spinner, Theme toggle, Private routes

**Dashboard Components** (`frontend/src/components/Dashboard/`)
- Main dashboard with weather display
- Search history sidebar
- Favorite cities management

**Layout Components** (`frontend/src/components/Layout/`)
- Header with navigation and user menu

**Weather Components** (`frontend/src/components/Weather/`)
- Search bar with geolocation
- Current weather card
- 5-day forecast grid

#### Context (`frontend/src/context/`)
- **AuthContext**: Global authentication state
- **ThemeContext**: Dark/light mode state

#### Services (`frontend/src/services/`)
- **api.js**: Axios configuration with interceptors
- **weatherService.js**: API call functions

#### Utils (`frontend/src/utils/`)
- **helpers.js**: Utility functions for formatting, validation, etc.

#### Main Files
- **App.jsx**: Main component with routing
- **index.js**: React DOM rendering
- **index.css**: Global CSS variables and styles
- **package.json**: Dependencies and scripts

## Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       └── Router
│           ├── Login
│           ├── Register
│           └── PrivateRoute
│               └── Dashboard
│                   ├── Header
│                   │   ├── ThemeToggle
│                   │   └── UserMenu
│                   ├── SearchBar
│                   ├── CurrentWeather
│                   ├── Forecast
│                   └── Sidebar
│                       ├── FavoriteCities
│                       └── SearchHistory
```

## Data Flow

### Authentication Flow
```
User Input → Login/Register Component
    ↓
AuthContext (login/register function)
    ↓
API Service (POST /api/auth/login or /register)
    ↓
Backend Controller (authController)
    ↓
Database (User model)
    ↓
JWT Token Generated
    ↓
Token stored in localStorage
    ↓
User redirected to Dashboard
```

### Weather Search Flow
```
User Input → SearchBar Component
    ↓
Dashboard Component (searchWeather function)
    ↓
Weather Service (getCurrentWeather, getForecast)
    ↓
API Service (GET /api/weather/current/:city)
    ↓
Backend Controller (weatherController)
    ↓
OpenWeatherMap API
    ↓
Weather Data Returned
    ↓
Search History Saved to Database
    ↓
State Updated (currentWeather, forecast)
    ↓
Components Re-render (CurrentWeather, Forecast)
```

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (protected)
```

### Weather Endpoints
```
GET    /api/weather/current/:city        - Get current weather (protected)
GET    /api/weather/forecast/:city       - Get 5-day forecast (protected)
GET    /api/weather/coordinates          - Get weather by lat/lon (protected)
```

### User Endpoints
```
GET    /api/user/history                 - Get search history (protected)
DELETE /api/user/history                 - Clear search history (protected)
GET    /api/user/favorites               - Get favorite cities (protected)
POST   /api/user/favorites               - Add favorite city (protected)
DELETE /api/user/favorites/:id           - Remove favorite city (protected)
```

## Database Collections

### users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### searchhistories
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  city: String,
  country: String,
  coordinates: { lat: Number, lon: Number },
  weatherData: {
    temperature: Number,
    condition: String,
    icon: String,
    humidity: Number,
    windSpeed: Number,
    pressure: Number
  },
  searchedAt: Date (indexed)
}
```

### favoritecities
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  city: String,
  country: String,
  coordinates: { lat: Number, lon: Number },
  addedAt: Date
}
```

## Technology Stack Summary

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **HTTP Client**: Axios
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS**: cors middleware

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3 with CSS Variables
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Create React App

### External APIs
- **Weather Data**: OpenWeatherMap API

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Editor**: VS Code (recommended)
- **API Testing**: Postman/Thunder Client
- **Database GUI**: MongoDB Compass

## File Size Estimates

```
Total Project Size: ~50 MB (with node_modules)
Without node_modules: ~500 KB

Backend:
  - Source Code: ~50 KB
  - node_modules: ~30 MB

Frontend:
  - Source Code: ~150 KB
  - node_modules: ~200 MB
  - Build Output: ~2 MB
```

## Lines of Code

```
Backend:
  - JavaScript: ~1,500 lines
  - Configuration: ~100 lines

Frontend:
  - JavaScript/JSX: ~2,500 lines
  - CSS: ~1,500 lines
  - Configuration: ~100 lines

Documentation:
  - Markdown: ~2,000 lines

Total: ~7,700 lines
```

## Key Features by File

### Authentication
- `backend/controllers/authController.js` - Registration, login, JWT generation
- `backend/middleware/auth.js` - Token verification
- `frontend/src/context/AuthContext.jsx` - Auth state management
- `frontend/src/components/Auth/` - Login/Register UI

### Weather Display
- `backend/controllers/weatherController.js` - API integration
- `frontend/src/components/Weather/` - Weather UI components
- `frontend/src/services/weatherService.js` - API calls

### User Features
- `backend/controllers/userController.js` - Favorites & history logic
- `backend/models/SearchHistory.js` - Auto-cleanup (50 max)
- `backend/models/FavoriteCity.js` - Limit enforcement (10 max)
- `frontend/src/components/Dashboard/` - Favorites & history UI

### Theme System
- `frontend/src/context/ThemeContext.jsx` - Theme state
- `frontend/src/index.css` - CSS variables for theming
- `frontend/src/components/Common/ThemeToggle.jsx` - Toggle UI

## Development Workflow

1. **Start Backend**: `cd backend && npm start`
2. **Start Frontend**: `cd frontend && npm start`
3. **Make Changes**: Edit files in respective directories
4. **Test**: Use browser and Postman
5. **Commit**: `git add . && git commit -m "message"`
6. **Deploy**: Follow DEPLOYMENT_GUIDE.md

## Maintenance

### Regular Updates
- Update dependencies: `npm update`
- Security audit: `npm audit fix`
- Check for outdated packages: `npm outdated`

### Backup
- Database: Regular MongoDB backups
- Code: Git repository
- Environment files: Secure storage (not in git)

---

**Last Updated**: May 11, 2026
