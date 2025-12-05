# Production Deployment Guide - Enterprise Level

## Overview
This guide details professional deployment practices for the MERN Portfolio using modern DevOps standards.

---

## Prerequisites

### Required Accounts
- [ ] Vercel account (Frontend deployment)
- [ ] Railway/Heroku account (Backend deployment)  
- [ ] MongoDB Atlas account (Database)
- [ ] Sentry account (Error tracking)
- [ ] GitHub account with repo access

### Required Secrets
Document these in your `.env.production`:
```
VITE_SENTRY_DSN=<your-sentry-dsn>
MONGODB_URI=<mongodb-atlas-connection>
SENTRY_DSN=<backend-sentry-dsn>
EMAIL_USER=<gmail-or-smtp>
EMAIL_PASSWORD=<app-password>
CORS_ORIGIN=<your-domain.com>
```

---

## Deployment Options

### Option 1: Vercel + Railway (Recommended - Fast & Free)

#### Frontend (Vercel)
```bash
# 1. Connect GitHub repo to Vercel
# 2. Add environment variables in Vercel dashboard
# 3. Set build command: cd client && npm run build
# 4. Set output directory: client/dist
# 5. Deploy!
```

#### Backend (Railway)
```bash
# 1. Connect GitHub repo to Railway
# 2. Add environment variables
# 3. Set start command: npm start
# 4. Railway auto-deploys on push
```

### Option 2: Docker + DigitalOcean/AWS (Enterprise)

```bash
# Build images
docker-compose build

# Push to Docker Hub
docker login
docker tag portfolio-frontend username/portfolio-frontend:latest
docker push username/portfolio-frontend:latest

# Deploy on DigitalOcean App Platform
# Or AWS ECS using docker-compose
```

### Option 3: Full Local Deployment

```bash
# Install Docker & Docker Compose
# Copy .env.production to .env
# Run:
docker-compose up -d

# Access: http://localhost
```

---

## Configuration Checklist

### 1. MongoDB Atlas Setup
```bash
- Create cluster in MongoDB Atlas
- Add IP whitelist (0.0.0.0/0 for testing, restrict in production)
- Create database user
- Get connection string
- Add to MONGODB_URI
```

### 2. Sentry Integration
```bash
- Create Sentry project for Node.js
- Create Sentry project for React
- Add DSNs to environment variables
- Configure release tracking in CI/CD
```

### 3. Email Service
```bash
# Using Gmail (Recommended)
- Enable 2-Factor Authentication
- Generate App Password
- Use as EMAIL_PASSWORD

# Alternative: SendGrid/Mailgun
- Get API key
- Update nodemailer config in server/utils/sendEmail.js
```

### 4. Security Headers
All configured in:
- `vercel.json` (Frontend)
- `nginx.conf` (If self-hosted)
- Express Helmet middleware (Backend)

### 5. CI/CD Pipeline
GitHub Actions workflow runs on every push:
- ✅ Linting & builds
- ✅ Security scanning (npm audit)
- ✅ Auto-deploy to production

---

## Post-Deployment Testing

```bash
# 1. Test Frontend
curl -I https://your-domain.com
# Check security headers present

# 2. Test Backend API
curl https://your-domain.com/api/projects
# Should return project list

# 3. Test Contact Form
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# 4. Check Sentry Dashboard
# Verify events are being logged

# 5. Monitor logs
# Railway: Dashboard → Deployments → Logs
# Vercel: Dashboard → Function Logs
```

---

## Performance Optimization

### Frontend (Already Optimized)
- ✅ Vite with code splitting
- ✅ Gzip compression
- ✅ Caching headers configured
- ✅ Image optimization via Tailwind

### Backend Optimization
- Add Redis cache (optional)
- Enable database indexing
- Implement request caching headers

### Database (MongoDB)
- Create indexes on frequently queried fields
- Monitor query performance in Atlas dashboard
- Enable automatic backups

---

## Monitoring & Maintenance

### Daily Checks
- Sentry dashboard for errors
- Uptime monitoring (use Uptime Robot free tier)
- Check logs for warnings

### Weekly Tasks
- Review database performance
- Check security updates for dependencies
- Monitor deployment costs

### Monthly Tasks
- Backup database export
- Security audit (npm audit)
- Performance profiling

---

## Rollback Procedure

### If Issue on Production
```bash
# Vercel: Click "Rollback" button on deployment
# Railway: Use previous deployment version
# Docker: Use tagged image from previous version
```

---

## Troubleshooting

### 502 Bad Gateway
```
→ Backend server not running
→ Check Railway logs
→ Verify MONGODB_URI is correct
→ Check environment variables
```

### CORS Errors
```
→ Ensure CORS_ORIGIN matches frontend domain
→ Restart backend after env variable change
```

### Email Not Sending
```
→ Verify EMAIL_USER and EMAIL_PASSWORD
→ Check Gmail App Passwords enabled
→ Verify sendEmail.js configuration
```

### Database Connection Timeout
```
→ Add your current IP to MongoDB Atlas whitelist
→ Check network connectivity
→ Verify MONGODB_URI format
```

---

## Security Best Practices

✅ Environment variables configured correctly
✅ HTTPS enforced (auto via Vercel/Railway)
✅ Security headers in place
✅ Rate limiting on API
✅ Input validation on all forms
✅ Helmet.js security middleware
✅ Regular dependency updates via Dependabot

---

## Support & Documentation

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://railway.app/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Sentry: https://docs.sentry.io

---

**Status:** Ready for Production ✅  
**Last Updated:** December 5, 2025  
**Maintained By:** Aryan Tiwari
