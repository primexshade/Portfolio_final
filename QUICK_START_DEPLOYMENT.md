# 🚀 MERN Portfolio - Quick Deployment Guide

## What's Ready for Production

✅ **Frontend:** React 18 + Vite + Tailwind (optimized, secure)  
✅ **Backend:** Node.js + Express + MongoDB (validated, tested)  
✅ **Security:** Helmet, CORS, Rate limiting, Input validation  
✅ **Monitoring:** Sentry error tracking (configured)  
✅ **Deployment:** Docker, Vercel, Railway configs ready  

---

## 🎯 Recommended: Vercel + Railway (5 min setup)

### Step 1: Deploy Frontend to Vercel

```bash
# A. Using GitHub
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Connect your GitHub repo
4. Configure:
   - Build Command: cd client && npm run build
   - Output Directory: client/dist
   - Environment: Add VITE_SENTRY_DSN
5. Deploy!

# OR B. Using CLI
npm install -g vercel
vercel --prod
```

**Your frontend will be at:** `https://your-project.vercel.app`

---

### Step 2: Deploy Backend to Railway

```bash
# Using GitHub (Recommended)
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables:
   - MONGODB_URI: <from MongoDB Atlas>
   - SENTRY_DSN: <from Sentry>
   - EMAIL_USER: <your Gmail>
   - EMAIL_PASSWORD: <Gmail app password>
   - CORS_ORIGIN: <your Vercel domain>
5. Railway auto-deploys!

# OR using CLI
npm install -g @railway/cli
railway login
railway up
```

**Your backend will be at:** `https://railway.app/dashboard`

---

### Step 3: Setup MongoDB Atlas (Free)

```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Add IP whitelist (0.0.0.0/0 for development)
5. Get connection string:
   mongodb+srv://username:password@cluster.mongodb.net/portfolio

6. Add to Railway environment:
   MONGODB_URI=<connection-string>
```

---

### Step 4: Setup Sentry (Free)

```bash
1. Go to https://sentry.io
2. Create project: Node.js (backend)
3. Create project: React (frontend)
4. Get DSNs

Frontend (.env):
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx

Backend (Railway):
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 🐳 Alternative: Docker Deployment (Full Stack Local)

### Prerequisites
- Docker installed: https://www.docker.com/products/docker-desktop

### Deploy Locally

```bash
# 1. Create .env file
cp .env.production.example .env

# 2. Edit .env with your credentials
MONGODB_URI=mongodb://portfolio_user:password@mongodb:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password

# 3. Run everything
docker-compose up -d

# 4. Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
# Nginx: http://localhost:80
```

### Check Status
```bash
docker-compose ps
docker-compose logs -f

# Health check
curl http://localhost:5001/api/health
```

---

## ✅ Post-Deployment Checklist

### Immediate (Day 1)
```bash
[ ] Test frontend loads: https://yourdomain.com
[ ] Test API: https://yourdomain.com/api/projects
[ ] Test contact form submission
[ ] Verify Sentry receives errors
[ ] Check security headers
```

### Testing
```bash
# Test API
curl https://your-backend.railway.app/api/projects

# Test contact endpoint
curl -X POST https://your-backend.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'

# Test health
curl https://your-backend.railway.app/api/health
```

### Security Check
```bash
# Check security headers
curl -I https://yourdomain.com

# Should include:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

---

## 🔄 Continuous Deployment (Auto-Deploy)

**Vercel:** Automatically deploys on every push to main/master  
**Railway:** Automatically deploys on every push to main/master  

**To deploy updates:**
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Vercel/Railway auto-deploy (1-2 minutes)
# Check status in their dashboards
```

---

## 🆘 Troubleshooting

### API Not Responding
```
Error: 502 Bad Gateway

Solution:
1. Check Railway logs: railway.app/dashboard
2. Verify MONGODB_URI is correct
3. Check all environment variables set
4. Restart Railway deployment
```

### Contact Form Not Sending Email
```
Error: Email fails silently

Solution:
1. Gmail: Enable 2FA + generate App Password
2. Verify EMAIL_USER and EMAIL_PASSWORD
3. Check email whitelist in code
4. Review backend logs
```

### CORS Errors
```
Error: CORS policy blocked

Solution:
1. Verify CORS_ORIGIN matches frontend domain
2. Restart backend after env change
3. Clear browser cache
4. Try incognito window
```

### Database Connection Timeout
```
Error: MongoDB connection timeout

Solution:
1. Add your current IP to MongoDB whitelist
2. Verify MONGODB_URI format
3. Check MongoDB Atlas cluster status
4. Test connection: mongosh <connection-string>
```

---

## 📊 Monitoring

### Daily Checks (5 min)
```
1. Uptime Robot: Is site up?
2. Sentry: Any critical errors?
3. Browser: Can you access the site?
```

### Weekly Checks
```
1. API response times (should be < 500ms)
2. Error rate (should be < 1%)
3. Database performance
4. Check for security updates: npm audit
```

### Monthly
```
1. Performance analysis
2. Cost review
3. Backup verification
4. Update dependencies: npm update
```

---

## 🔐 Security Checklist

✅ HTTPS enabled (auto on Vercel/Railway)  
✅ Environment variables secure (no secrets in code)  
✅ Rate limiting on API  
✅ Input validation on all forms  
✅ Security headers configured  
✅ CORS properly configured  
✅ Error tracking with Sentry  
✅ Database credentials encrypted  

---

## 💰 Cost Estimates

**Vercel Frontend:** Free ($0/month for hobby)  
**Railway Backend:** Free tier generous (~$5/month after)  
**MongoDB Atlas:** Free tier (512MB, great for portfolio)  
**Sentry:** Free tier (1000 errors/month)  

**Total:** ~$5-10/month for small portfolio

---

## 🚀 Next Steps

1. **Deploy today** using Vercel + Railway (recommended)
2. **Test everything** using checklist above
3. **Monitor** for 24 hours using Sentry
4. **Share** your portfolio: https://yourdomain.com
5. **Update** contact info to receive messages

---

## 📚 Detailed Guides

- 📖 **Full Deployment Guide:** `PRODUCTION_DEPLOYMENT.md`
- 📊 **Monitoring & Maintenance:** `MONITORING_MAINTENANCE.md`
- 🐳 **Docker Setup:** See `docker-compose.yml`

---

## ❓ Common Questions

**Q: Can I make changes after deployment?**  
A: Yes! Push to GitHub, auto-deploys in 1-2 minutes.

**Q: Do I need my own domain?**  
A: No, use Vercel's free domain initially. Add custom domain later.

**Q: How do I backup my data?**  
A: MongoDB Atlas auto-backups. Export monthly to S3.

**Q: What if something breaks?**  
A: Rollback to previous deployment (1-click in dashboard).

**Q: How do I scale up?**  
A: Increase Railway server tier as users grow.

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://railway.app/docs
- MongoDB: https://docs.mongodb.com
- Sentry: https://docs.sentry.io

---

**Status:** 🟢 Ready for Production  
**Last Updated:** December 5, 2025  
**Deployed By:** Aryan Tiwari
