# Deployment Guide

This guide provides step-by-step instructions for deploying the Weather Forecasting Application to production.

## Prerequisites

- Node.js 14+ installed
- MongoDB Atlas account (or local MongoDB)
- OpenWeatherMap API key
- Git installed
- Accounts on deployment platforms (Heroku, Vercel, or Netlify)

## Table of Contents

1. [Backend Deployment (Heroku)](#backend-deployment-heroku)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Testing](#post-deployment-testing)

---

## Backend Deployment (Heroku)

### Step 1: Prepare Your Application

1. Ensure your `backend/package.json` has a start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

2. Create a `Procfile` in the backend directory:
```
web: node server.js
```

### Step 2: Install Heroku CLI

Download and install from: https://devcenter.heroku.com/articles/heroku-cli

### Step 3: Login to Heroku

```bash
heroku login
```

### Step 4: Create Heroku App

```bash
cd backend
heroku create your-weather-app-api
```

### Step 5: Set Environment Variables

```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
heroku config:set JWT_SECRET="your_jwt_secret_key"
heroku config:set OPENWEATHER_API_KEY="your_openweather_api_key"
heroku config:set NODE_ENV="production"
heroku config:set CORS_ORIGIN="https://your-frontend-domain.com"
```

### Step 6: Deploy to Heroku

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Deploy
git push heroku main
```

### Step 7: Verify Deployment

```bash
heroku logs --tail
heroku open
```

Your backend API should now be live at: `https://your-weather-app-api.herokuapp.com`

---

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Configure Environment Variables

Create a `.env.production` file in the frontend directory:

```env
REACT_APP_API_URL=https://your-weather-app-api.herokuapp.com/api
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
```

### Step 4: Deploy to Vercel

```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **weather-app-frontend**
- Directory? **./frontend**
- Override settings? **N**

### Step 5: Set Environment Variables in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `REACT_APP_API_URL`
   - `REACT_APP_OPENWEATHER_API_KEY`

### Step 6: Redeploy

```bash
vercel --prod
```

Your frontend should now be live at: `https://your-project.vercel.app`

---

## Frontend Deployment (Netlify)

### Step 1: Build the Application

```bash
cd frontend
npm run build
```

### Step 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy
```

Follow the prompts:
- Create & configure a new site? **Y**
- Team? Select your team
- Site name? **weather-app-frontend**
- Publish directory? **build**

### Step 3: Set Environment Variables

```bash
netlify env:set REACT_APP_API_URL "https://your-weather-app-api.herokuapp.com/api"
netlify env:set REACT_APP_OPENWEATHER_API_KEY "your_openweather_api_key"
```

### Step 4: Deploy to Production

```bash
netlify deploy --prod
```

Your frontend should now be live at: `https://your-site-name.netlify.app`

---

## Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (Free tier is sufficient)

### Step 2: Configure Database Access

1. Go to Database Access
2. Add New Database User
3. Set username and password
4. Grant "Read and write to any database" privileges

### Step 3: Configure Network Access

1. Go to Network Access
2. Add IP Address
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development
4. For production, add specific IP addresses

### Step 4: Get Connection String

1. Go to Clusters → Connect
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `weather-app`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
```

---

## Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key | `abc123...` |
| `NODE_ENV` | Environment mode | `production` |
| `CORS_ORIGIN` | Frontend URL for CORS | `https://yourapp.com` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://api.yourapp.com/api` |
| `REACT_APP_OPENWEATHER_API_KEY` | OpenWeatherMap API key | `abc123...` |

---

## Post-Deployment Testing

### 1. Test Backend API

```bash
# Health check
curl https://your-api-url.herokuapp.com/api/health

# Test authentication
curl -X POST https://your-api-url.herokuapp.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### 2. Test Frontend

1. Open your deployed frontend URL
2. Register a new account
3. Login with credentials
4. Search for a city
5. Add city to favorites
6. Check search history
7. Toggle dark/light mode
8. Test geolocation feature

### 3. Monitor Logs

**Heroku:**
```bash
heroku logs --tail --app your-weather-app-api
```

**Vercel:**
- Go to Vercel Dashboard → Your Project → Deployments → View Function Logs

**Netlify:**
- Go to Netlify Dashboard → Your Site → Deploys → Deploy Log

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `CORS_ORIGIN` in backend matches your frontend URL
- Check that frontend is making requests to correct backend URL

**2. Database Connection Failed**
- Verify MongoDB Atlas connection string
- Check network access settings in MongoDB Atlas
- Ensure database user has correct permissions

**3. API Key Issues**
- Verify OpenWeatherMap API key is valid
- Check API key usage limits
- Ensure API key is set in both backend and frontend

**4. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

**5. Environment Variables Not Working**
- Ensure variables are set in deployment platform
- Redeploy after setting new variables
- Check variable names match exactly (case-sensitive)

---

## Continuous Deployment

### GitHub Integration

**Heroku:**
1. Go to Heroku Dashboard → Your App → Deploy
2. Connect to GitHub
3. Enable Automatic Deploys from main branch

**Vercel:**
1. Import project from GitHub
2. Vercel automatically deploys on push to main

**Netlify:**
1. Go to Site Settings → Build & Deploy
2. Link to GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong JWT secrets** (at least 32 characters)
3. **Enable HTTPS** on all production deployments
4. **Restrict CORS** to specific domains in production
5. **Use environment-specific** MongoDB databases
6. **Rotate API keys** regularly
7. **Monitor API usage** to detect anomalies
8. **Keep dependencies updated** for security patches

---

## Scaling Considerations

### Backend Scaling
- Use Heroku's dyno scaling for increased traffic
- Implement Redis caching for API responses
- Use MongoDB indexes for faster queries
- Consider load balancing for high availability

### Frontend Scaling
- Vercel and Netlify handle scaling automatically
- Use CDN for static assets
- Implement service workers for offline support
- Optimize images and bundle size

---

## Maintenance

### Regular Tasks
- Monitor error logs weekly
- Update dependencies monthly
- Review API usage and costs
- Backup database regularly
- Test all features after updates

### Performance Monitoring
- Use Heroku metrics or New Relic
- Monitor API response times
- Track user engagement
- Set up alerts for errors

---

## Support

For issues or questions:
- Check the main README.md
- Review error logs
- Consult platform documentation:
  - [Heroku Docs](https://devcenter.heroku.com/)
  - [Vercel Docs](https://vercel.com/docs)
  - [Netlify Docs](https://docs.netlify.com/)
  - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
