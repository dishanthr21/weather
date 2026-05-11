# Installation Script Guide

Quick installation commands for different operating systems.

## Prerequisites Check

Before running installation commands, verify you have:

```bash
# Check Node.js
node --version  # Should be v14.0.0 or higher

# Check npm
npm --version   # Should be 6.0.0 or higher

# Check MongoDB (if using local)
mongod --version  # Should be v4.4 or higher
```

## Quick Install Commands

### For Windows (PowerShell)

```powershell
# Clone or navigate to project directory
cd weather-app

# Backend Setup
cd backend
npm install
Copy-Item .env.example .env
Write-Host "⚠️ Edit backend/.env and add your API keys"
pause

# Frontend Setup
cd ../frontend
npm install
Copy-Item .env.example .env
Write-Host "⚠️ Edit frontend/.env and add your API keys"
pause

Write-Host "✅ Installation complete! Follow QUICK_START.md to run the app"
```

### For macOS/Linux (Bash)

```bash
#!/bin/bash

# Navigate to project directory
cd weather-app

# Backend Setup
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Copy environment file
cp .env.example .env
echo "⚠️  Please edit backend/.env and add your API keys"
echo "Press Enter to continue..."
read

# Frontend Setup
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Copy environment file
cp .env.example .env
echo "⚠️  Please edit frontend/.env and add your API keys"
echo "Press Enter to continue..."
read

echo "✅ Installation complete! Follow QUICK_START.md to run the app"
```

## Automated Setup Script

### Windows (setup.bat)

Create a file named `setup.bat` in the project root:

```batch
@echo off
echo ========================================
echo Weather App Installation Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo.
echo Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Backend installation failed!
    pause
    exit /b 1
)

echo.
echo Creating backend .env file...
if not exist .env (
    copy .env.example .env
    echo ✅ Created backend/.env
) else (
    echo ⚠️  backend/.env already exists
)

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo Creating frontend .env file...
if not exist .env (
    copy .env.example .env
    echo ✅ Created frontend/.env
) else (
    echo ⚠️  frontend/.env already exists
)

cd ..

echo.
echo ========================================
echo ✅ Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit backend/.env and add your MongoDB URI and API keys
echo 2. Edit frontend/.env and add your API keys
echo 3. Run 'start.bat' to start both servers
echo.
echo For detailed instructions, see QUICK_START.md
echo.
pause
```

### macOS/Linux (setup.sh)

Create a file named `setup.sh` in the project root:

```bash
#!/bin/bash

echo "========================================"
echo "Weather App Installation Script"
echo "========================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js is installed: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi
echo "✅ npm is installed: $(npm --version)"

# Backend setup
echo ""
echo "Installing Backend Dependencies..."
cd backend || exit
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed!"
    exit 1
fi

# Create backend .env
echo ""
echo "Creating backend .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

# Frontend setup
echo ""
echo "Installing Frontend Dependencies..."
cd ../frontend || exit
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi

# Create frontend .env
echo ""
echo "Creating frontend .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env"
else
    echo "⚠️  frontend/.env already exists"
fi

cd ..

echo ""
echo "========================================"
echo "✅ Installation Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Edit backend/.env and add your MongoDB URI and API keys"
echo "2. Edit frontend/.env and add your API keys"
echo "3. Run './start.sh' to start both servers"
echo ""
echo "For detailed instructions, see QUICK_START.md"
echo ""
```

Make it executable:
```bash
chmod +x setup.sh
```

## Start Scripts

### Windows (start.bat)

Create a file named `start.bat` in the project root:

```batch
@echo off
echo Starting Weather App...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ✅ Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause >nul

taskkill /FI "WindowTitle eq Backend Server*" /T /F
taskkill /FI "WindowTitle eq Frontend Server*" /T /F
```

### macOS/Linux (start.sh)

Create a file named `start.sh` in the project root:

```bash
#!/bin/bash

echo "Starting Weather App..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Start backend
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
wait
```

Make it executable:
```bash
chmod +x start.sh
```

## Usage

### First Time Setup

**Windows:**
```powershell
# Run setup script
.\setup.bat

# Edit .env files with your API keys
notepad backend\.env
notepad frontend\.env

# Start the application
.\start.bat
```

**macOS/Linux:**
```bash
# Run setup script
./setup.sh

# Edit .env files with your API keys
nano backend/.env
nano frontend/.env

# Start the application
./start.sh
```

### Subsequent Runs

Just run the start script:

**Windows:**
```powershell
.\start.bat
```

**macOS/Linux:**
```bash
./start.sh
```

## Manual Installation

If scripts don't work, follow these manual steps:

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm start
```

### 2. Frontend (New Terminal)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your values
npm start
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

## Troubleshooting Installation

### npm install fails

**Solution 1: Clear npm cache**
```bash
npm cache clean --force
npm install
```

**Solution 2: Delete node_modules**
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json

# macOS/Linux
rm -rf node_modules package-lock.json

npm install
```

**Solution 3: Use different registry**
```bash
npm install --registry=https://registry.npmjs.org/
```

### Permission errors (macOS/Linux)

```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### MongoDB connection fails

**Check if MongoDB is running:**

**Windows:**
```powershell
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Port already in use

**Find and kill process:**

**Windows:**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000
# Kill process (replace PID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Verification

After installation, verify everything works:

```bash
# Check backend
curl http://localhost:5000/api/health

# Check frontend
# Open browser: http://localhost:3000
```

## Getting Help

If you encounter issues:

1. Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed troubleshooting
2. Review [QUICK_START.md](QUICK_START.md) for quick setup
3. Check error messages in terminal
4. Verify all prerequisites are installed
5. Ensure .env files are configured correctly

---

**Installation complete! 🎉**

Next: Follow [QUICK_START.md](QUICK_START.md) to run the application.
