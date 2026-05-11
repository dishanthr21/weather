# Setup Instructions

Complete step-by-step guide to set up and run the Weather Forecasting Application locally.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting OpenWeatherMap API Key](#getting-openweathermap-api-key)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v14.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB** (v4.4 or higher)
   
   **Option A: Local Installation**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS
   - Start MongoDB service:
     ```bash
     # Windows
     net start MongoDB
     
     # macOS
     brew services start mongodb-community
     
     # Linux
     sudo systemctl start mongod
     ```
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at: https://www.mongodb.com/cloud/atlas
   - Follow [Database Setup Guide](DEPLOYMENT_GUIDE.md#database-setup-mongodb-atlas)

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

### Recommended Tools

- **VS Code** or any code editor
- **Postman** or **Thunder Client** for API testing
- **MongoDB Compass** for database visualization

---

## Getting OpenWeatherMap API Key

1. **Create Account**
   - Go to: https://openweathermap.org/
   - Click "Sign Up" in the top right
   - Fill in your details and create account

2. **Generate API Key**
   - After login, go to: https://home.openweathermap.org/api_keys
   - Your default API key will be shown
   - Or click "Generate" to create a new key
   - Copy the API key (you'll need it later)

3. **Activate API Key**
   - New API keys take 10-15 minutes to activate
   - Test your key at: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- axios
- express-validator

### Step 3: Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Or create manually with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/weather-app

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# OpenWeatherMap API
OPENWEATHER_API_KEY=your_openweathermap_api_key_here

# CORS Origin (frontend URL)
CORS_ORIGIN=http://localhost:3000
```

### Step 4: Configure Environment Variables

Edit the `.env` file and update:

1. **MONGODB_URI**
   - Local MongoDB: `mongodb://localhost:27017/weather-app`
   - MongoDB Atlas: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/weather-app`

2. **JWT_SECRET**
   - Generate a random string (at least 32 characters)
   - Example: `my_super_secret_jwt_key_12345_change_this`

3. **OPENWEATHER_API_KEY**
   - Paste your OpenWeatherMap API key from earlier

### Step 5: Verify Backend Setup

```bash
# Start the backend server
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
```

Test the API:
```bash
# Open browser or use curl
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Weather App API is running",
  "timestamp": "2026-05-11T..."
}
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal** window and navigate to frontend:

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- chart.js
- react-chartjs-2

### Step 3: Create Environment File

Create a `.env` file in the `frontend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Or create manually with this content:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

### Step 4: Configure Environment Variables

Edit the `.env` file and update:

1. **REACT_APP_API_URL**
   - Keep as: `http://localhost:5000/api`
   - This points to your local backend

2. **REACT_APP_OPENWEATHER_API_KEY**
   - Paste your OpenWeatherMap API key

### Step 5: Verify Frontend Setup

```bash
# Start the frontend development server
npm start
```

The application should automatically open in your browser at:
```
http://localhost:3000
```

---

## Running the Application

### Starting Both Servers

You need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Alternative: Using npm-run-all (Optional)

Install in root directory:
```bash
npm install -g npm-run-all
```

Create `package.json` in root:
```json
{
  "scripts": {
    "start": "npm-run-all --parallel start:backend start:frontend",
    "start:backend": "cd backend && npm start",
    "start:frontend": "cd frontend && npm start"
  }
}
```

Then run both with:
```bash
npm start
```

---

## Verification

### 1. Check Backend

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Test Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "token": "..."
  }
}
```

### 2. Check Frontend

1. Open browser: http://localhost:3000
2. You should see the login page
3. Click "Sign up" to create an account
4. Fill in the registration form
5. After registration, you'll be redirected to the dashboard

### 3. Test Features

**Registration & Login:**
- ✅ Create a new account
- ✅ Login with credentials
- ✅ See your name in the header

**Weather Search:**
- ✅ Search for "London"
- ✅ See current weather displayed
- ✅ See 5-day forecast

**Favorites:**
- ✅ Click the star icon to add to favorites
- ✅ Check "Favorites" tab in sidebar
- ✅ Click favorite to load weather

**Search History:**
- ✅ Search multiple cities
- ✅ Check "History" tab in sidebar
- ✅ Click history item to reload

**Theme Toggle:**
- ✅ Click moon/sun icon in header
- ✅ Theme should switch
- ✅ Refresh page - theme persists

**Geolocation:**
- ✅ Click location icon (📍)
- ✅ Allow location access
- ✅ Weather for your location loads

---

## Troubleshooting

### Backend Issues

**Problem: MongoDB Connection Failed**
```
❌ Error connecting to MongoDB: connect ECONNREFUSED
```

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl status mongod
   ```

2. Verify connection string in `.env`
3. For MongoDB Atlas, check network access settings

---

**Problem: Port 5000 Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
1. Change port in `backend/.env`:
   ```env
   PORT=5001
   ```

2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

---

**Problem: OpenWeatherMap API Error**
```
401 Unauthorized - Invalid API key
```

**Solutions:**
1. Verify API key is correct in `.env`
2. Wait 10-15 minutes for new keys to activate
3. Check API key at: https://home.openweathermap.org/api_keys

---

### Frontend Issues

**Problem: Cannot Connect to Backend**
```
Network Error / CORS Error
```

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `REACT_APP_API_URL` in `frontend/.env`
3. Verify CORS_ORIGIN in `backend/.env` includes `http://localhost:3000`

---

**Problem: Blank Page / White Screen**
```
Nothing displays after npm start
```

**Solutions:**
1. Check browser console for errors (F12)
2. Clear browser cache and reload
3. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

**Problem: Environment Variables Not Working**
```
undefined or null values
```

**Solutions:**
1. Ensure `.env` file exists in correct directory
2. Restart development server after changing `.env`
3. Variable names must start with `REACT_APP_`
4. No spaces around `=` in `.env` file

---

### Database Issues

**Problem: Cannot Create User**
```
E11000 duplicate key error
```

**Solution:**
- Email already exists in database
- Use a different email or clear database:
  ```bash
  # MongoDB Shell
  use weather-app
  db.users.deleteMany({})
  ```

---

**Problem: Search History Not Saving**
```
No error but history doesn't appear
```

**Solutions:**
1. Check if user is authenticated (token in localStorage)
2. Verify MongoDB connection
3. Check browser console for errors

---

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend:** Changes auto-refresh browser
- **Backend:** Use `nodemon` for auto-restart:
  ```bash
  npm install -g nodemon
  nodemon server.js
  ```

### Debugging

**Backend:**
- Add `console.log()` statements
- Use VS Code debugger
- Check terminal output

**Frontend:**
- Use React DevTools browser extension
- Check browser console (F12)
- Use `console.log()` in components

### Database Inspection

**MongoDB Compass:**
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse `weather-app` database

**MongoDB Shell:**
```bash
mongosh
use weather-app
db.users.find()
db.searchhistories.find()
db.favoritecities.find()
```

---

## Next Steps

After successful setup:

1. **Explore the Code**
   - Review component structure
   - Understand API endpoints
   - Study database models

2. **Customize**
   - Change color scheme in CSS
   - Add new features
   - Modify UI components

3. **Deploy**
   - Follow [Deployment Guide](DEPLOYMENT_GUIDE.md)
   - Deploy to Heroku, Vercel, or Netlify

4. **Learn More**
   - React documentation: https://react.dev/
   - Express.js guide: https://expressjs.com/
   - MongoDB tutorials: https://docs.mongodb.com/

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review error messages carefully
3. Search for error messages online
4. Check project README.md
5. Review code comments

---

## Summary Checklist

- [ ] Node.js installed and verified
- [ ] MongoDB installed/configured
- [ ] OpenWeatherMap API key obtained
- [ ] Backend dependencies installed
- [ ] Backend `.env` file configured
- [ ] Backend server starts successfully
- [ ] Frontend dependencies installed
- [ ] Frontend `.env` file configured
- [ ] Frontend opens in browser
- [ ] Can register new user
- [ ] Can search for weather
- [ ] Can add favorites
- [ ] Search history works
- [ ] Theme toggle works
- [ ] Geolocation works

**Congratulations! Your Weather Forecasting Application is ready to use! 🎉**
