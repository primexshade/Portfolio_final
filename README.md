# MERN Portfolio - Production Ready

A modern, full-stack portfolio website with **enterprise-grade security**, **error tracking**, and **automated deployment**.

**Technology Stack:** MongoDB · Express · React · Node.js · Sentry · GitHub Actions  
**Project Status:** Production Ready with CI/CD

---

## Core Features

- **Modern User Interface** - Dark theme, liquid glass effects, smooth animations
- **Security Hardened** - Input validation, XSS protection, rate limiting
- **Monitored** - Sentry error tracking, performance monitoring
- **Automated Deployment** - GitHub Actions CI/CD pipeline
- **Contact Form** - Spam protection and email delivery
- **Statistics Integration** - GitHub and LeetCode statistics
- **Backup Ready** - MongoDB Atlas + S3 backup strategy
- **HTTPS Ready** - SSL/TLS configuration guides

---

## Technology Stack

### Frontend
- **React 18** + Vite - Fast build tool and modern React
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Sentry** - Error tracking and monitoring

### Backend
- **Node.js 24** + Express - Server and API
- **MongoDB Atlas** - Cloud database
- **Nodemailer** - Email delivery
- **Express Validator** - Input validation
- **Helmet** - Security headers

### DevOps
- **GitHub Actions** - CI/CD automation
- **Vercel** - Frontend hosting (HTTPS auto)
- **Heroku** - Backend hosting (HTTPS auto)
- **Sentry** - Error monitoring

---

## Quick Start Guide

### Local Development Setup

```bash
# 1. Clone repository
git clone <your-repo-url>
cd mern-portfolio

# 2. Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# 3. Configure environment
# Copy server/.env.example to server/.env
# Add your MongoDB URI and email credentials

# 4. Start development server
cd ..
npm run dev
```

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:5001

---

## Documentation

- **[PROJECT_COMPLETE_REPORT.md](PROJECT_COMPLETE_REPORT.md)** - Complete technical documentation (1000+ lines)
- **[DEPLOY_QUICK_REFERENCE.md](DEPLOY_QUICK_REFERENCE.md)** - Quick deployment guide

---

## Deployment Process

### Prerequisites Required
- MongoDB Atlas account (free tier)
- Gmail App Password for SMTP
- Sentry account (optional but recommended)
- Vercel account (frontend)
- Heroku account (backend)

### Step 1: Environment Variables

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://...
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
SENTRY_DSN=https://...@sentry.io/...
CLIENT_ORIGIN=https://your-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-api.herokuapp.com/api
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_RECAPTCHA_SITE_KEY=6LdX...
```

### Step 2: Deploy Frontend (Vercel)
```bash
cd client
npm install -g vercel
vercel --prod
```

### Step 3: Deploy Backend (Heroku)
```bash
cd server
git push heroku main
```

**See [DEPLOY_QUICK_REFERENCE.md](DEPLOY_QUICK_REFERENCE.md) or [PROJECT_COMPLETE_REPORT.md](PROJECT_COMPLETE_REPORT.md) for detailed steps.**

---

## Security Features

- **Input Validation** - All form inputs validated and sanitized  
- **XSS Protection** - DOMPurify + HTML escaping  
- **Rate Limiting** - 5 submissions per hour per IP address  
- **CSRF Protection** - Request headers verification  
- **Security Headers** - Helmet.js configured  
- **Error Handling** - No sensitive data exposure  
- **CAPTCHA Ready** - reCAPTCHA v3 integration guide  

---

## Monitoring and Analytics

- **Error Tracking:** Sentry (backend + frontend)
- **Performance:** Lighthouse + Core Web Vitals
- **Uptime:** Uptime Robot (recommended)
- **Analytics:** Google Analytics (optional)
- **Logs:** Heroku logs + MongoDB Atlas

---

## Testing Procedures

```bash
# Run development server and test
npm run dev

# Test contact form validation
# Test API endpoints
curl http://localhost:5001/api/health

# Build for production
cd client && npm run build
cd ../server && npm start
```

---

## Project Structure

```
mern-portfolio/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Utilities (security.js, api.js)
│   │   └── main.jsx          # Entry point with Sentry
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/               # Configuration (db.js, sentry.js)
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware (validation.js)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   └── index.js              # Server entry with Sentry
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD automation
│
└── Documentation files       # Setup and deployment guides
```

---

## Production Deployment Checklist

- [ ] Environment variables configured
- [ ] Sentry accounts created
- [ ] reCAPTCHA keys added
- [ ] GitHub Secrets configured
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Heroku
- [ ] HTTPS verified
- [ ] Contact form tested
- [ ] Error tracking verified
- [ ] Monitoring alerts set

**See [PROJECT_COMPLETE_REPORT.md](PROJECT_COMPLETE_REPORT.md) for complete deployment details.**

---

## Monthly Operating Cost

| Service | Tier | Cost |
|---------|------|------|
| Frontend (Vercel) | Free | $0 |
| Backend (Heroku) | Hobby | $7 |
| Database (MongoDB Atlas) | Free | $0 |
| Sentry | Developer | $0 |
| **Total** | | **$7/month** |

---

## Support and Contact

- **Documentation:** See guides in project root
- **Issues:** Create GitHub issue
- **Email:** aaryan.tiwari54@gmail.com

---

## License

MIT License - Open source and available for personal use.

---

## Acknowledgments

Built with modern web technologies and best practices for production deployment.

**Current Status:** Production Ready | Security Hardened | Monitored | CI/CD Enabled

---

**Deployment Ready** - Refer to [DEPLOY_QUICK_REFERENCE.md](DEPLOY_QUICK_REFERENCE.md) for deployment instructions.
