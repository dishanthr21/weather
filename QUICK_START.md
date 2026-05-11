# Quick Start Guide

Get the Weather Forecasting Application running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- MongoDB running (local or Atlas)
- OpenWeatherMap API key

## 1. Get API Key

1. Sign up at https://openweathermap.org/
2. Get your API key from https://home.openweathermap.org/api_keys
3. Wait 10-15 minutes for activation

## 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=my_super_secret_jwt_key_12345
OPENWEATHER_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:3000
EOF

# Start backend
npm start
```

**Expected output:**
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
```

## 3. Frontend Setup

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
EOF

# Start frontend
npm start
```

**Browser opens automatically at:** http://localhost:3000

## 4. Test the Application

1. **Register:** Create a new account
2. **Search:** Type "London" and click Search
3. **View:** See current weather and 5-day forecast
4. **Favorite:** Click the star icon to save
5. **History:** Check the History tab in sidebar

## Troubleshooting

### MongoDB Not Running?

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Port 5000 Already in Use?

Change port in `backend/.env`:
```env
PORT=5001
```

### API Key Not Working?

- Wait 10-15 minutes after creation
- Verify key at: https://home.openweathermap.org/api_keys
- Check for typos in `.env` file

## What's Next?

- Read [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed setup
- Check [README.md](README.md) for full documentation
- See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production deployment

## Quick Commands Reference

### Start Both Servers

**Terminal 1 (Backend):**
```bash
cd backend && npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm start
```

### Stop Servers

Press `Ctrl + C` in each terminal

### Reset Database

```bash
mongosh
use weather-app
db.dropDatabase()
```

### Clear Browser Data

1. Open DevTools (F12)
2. Application → Storage → Clear site data

---

**Need help?** Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed troubleshooting.
