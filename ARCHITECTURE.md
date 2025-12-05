# MERN Portfolio - Production Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRODUCTION ENVIRONMENT                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         USER TIER (Browser)                          │
│                    User accessing yourdomain.com                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Cloudflare    │  (Optional CDN)
                    │   DNS & Cache   │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│  Vercel Edge   │  │  API Gateway    │  │  Static Files  │
│  (Frontend)    │  │  (Middleware)   │  │  (Assets)      │
└───────┬────────┘  └────────┬────────┘  └───────┬────────┘
        │                    │                    │
        └────────┬───────────┴────────────┬───────┘
                 │                        │
    ┌────────────▼─────────────┐ ┌───────▼────────────────┐
    │  VERCEL (Frontend Tier)  │ │ RAILWAY (Backend Tier) │
    ├──────────────────────────┤ ├────────────────────────┤
    │ • React 18 SPA           │ │ • Node.js Express API  │
    │ • Built from client/dist │ │ • Rate Limiting        │
    │ • Auto-scaling           │ │ • Health Check         │
    │ • Auto-HTTPS             │ │ • Auto-scaling         │
    │ • CDN edge caching       │ │ • Error Handling       │
    │ • Sentry integration     │ │ • Sentry integration   │
    └────────────┬─────────────┘ └───────┬────────────────┘
                 │                       │
                 │       API Calls       │
                 └──────────┬────────────┘
                            │
                 ┌──────────▼──────────┐
                 │  Express Middleware │
                 ├─────────────────────┤
                 │ • CORS              │
                 │ • Helmet.js         │
                 │ • Rate Limiter      │
                 │ • Morgan Logger     │
                 │ • Body Parser       │
                 │ • Error Handler     │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼──────────┐
│  API Routes    │  │  Project Data  │  │ Contact Form    │
├────────────────┤  │  Endpoint      │  │ Endpoint        │
│ /api/projects  │  │                │  │                 │
│ /api/github    │  │ Returns        │  │ • Validation    │
│ /api/leetcode  │  │ projects list  │  │ • Email send    │
│ /api/health    │  │ with details   │  │ • Rate limit    │
│ /api/contact   │  │                │  │ • Logging       │
└────────────────┘  └────────────────┘  └─────────────────┘
                            │
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼─────────────┐            ┌──────────▼──────────┐
│  MONGODB ATLAS      │            │  NODEMAILER SMTP    │
│  (Data Tier)        │            │  (Email Service)    │
├─────────────────────┤            ├─────────────────────┤
│ • MongoDB 7         │            │ • Gmail SMTP        │
│ • 512MB free tier   │            │ • TLS encryption    │
│ • Auto-backups      │            │ • Rate limited      │
│ • Replication       │            │ • Retry logic       │
│ • Atlas UI          │            │ • Error tracking    │
│ • Query indexing    │            │                     │
└─────────────────────┘            └─────────────────────┘
        │
        └───────────────────────────────────────┐
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        │                                               │
                ┌───────▼────────────┐                  ┌───────────────▼────────┐
                │  SENTRY DASHBOARD  │                  │  UPTIME ROBOT          │
                ├────────────────────┤                  ├────────────────────────┤
                │ • Error tracking   │                  │ • Uptime monitoring    │
                │ • Performance data │                  │ • Alert notifications  │
                │ • User context     │                  │ • Status page          │
                │ • Release tracking │                  │ • Historical reports   │
                │ • Alerting         │                  │ • 5-min intervals      │
                └────────────────────┘                  └────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                       MONITORING & OBSERVABILITY                     │
├─────────────────────────────────────────────────────────────────────┤
│ Sentry → Error tracking (frontend + backend)                        │
│ Morgan → Request logging                                            │
│ Console → Application logs                                          │
│ Railway/Vercel → Deployment & runtime logs                          │
│ MongoDB Atlas UI → Database metrics                                 │
│ Uptime Robot → Service availability                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### User Accessing Portfolio

```
User Action → Browser → Vercel Edge → Client/dist/index.html
                         ↓
                   React app loads
                         ↓
                   API calls to Railway
                         ↓
                   Express processes request
                         ↓
                   Query/response data
                         ↓
                   Display in UI
```

### Contact Form Submission

```
User fills form → Validate input → API request → Express handler
                                        ↓
                                  Rate limiter check
                                        ↓
                              Input sanitization
                                        ↓
                            Nodemailer sends email
                                        ↓
                            Save to MongoDB
                                        ↓
                            Return success/error
                                        ↓
                          Show confirmation message
```

### Error Tracking

```
Frontend Error → Sentry Client → Sentry API → Sentry Dashboard
                      ↓
                  Log context
                      ↓
                  Send to Sentry

Backend Error → Express errorHandler → Sentry SDK → Sentry API
                       ↓
                   Log stack trace
                       ↓
                   Send to Sentry

Alert Triggered → Email/Slack notification → Developer action
```

---

## Deployment Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                  GitHub Repository (Main Branch)             │
│                    Code push triggered                         │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │  GitHub Actions Workflow (deploy.yml)  │
        │                                        │
        │  1. Checkout code                      │
        │  2. Install dependencies               │
        │  3. Run linting                        │
        │  4. Security audit (npm audit)         │
        │  5. Build frontend (Vite)              │
        │  6. Build backend (validation)         │
        │  7. Run tests                          │
        └────────────┬─────────────────────────┘
                     │
        ┌────────────▼─────────────────────────┐
        │  Build Successful?                   │
        └──┬──────────────────────────────────┬┘
           │ Yes                           No │
           │                                  │
      ┌────▼────┐                       ┌─────▼──────┐
      │  Deploy │                       │ Notify Dev │
      │ to Prod │                       │  (Failed)  │
      └────┬────┘                       └────────────┘
           │
           ├─────────────────┬─────────────────┐
           │                 │                 │
      ┌────▼──────┐   ┌──────▼────────┐  ┌────▼─────┐
      │  Vercel   │   │   Railway     │  │ Sentry   │
      │ (Frontend)│   │  (Backend)    │  │ Release  │
      └────┬──────┘   └──────┬────────┘  └──────────┘
           │                 │
           ├─────────┬───────┤
           │         │       │
      ┌────▼────┐  ┌─▼──────▼┐
      │ Build   │  │ Smoke   │
      │ Docker  │  │ Tests   │
      │ Image   │  └────┬────┘
      └────┬────┘       │
           │       ┌─────▼─────┐
           │       │ Success?  │
           │       ├─┬─────┬─┐ │
           │       │ │Yes  │ │ │
           │       │ └──┬──┘ │ │
           │       │    │    │ │
           │       └────┼────┘ │
           │            │      │
      ┌────▼────────────▼──────▼────┐
      │ Deploy complete              │
      │ • Frontend at https://domain │
      │ • Backend at API gateway     │
      │ • Monitoring active          │
      │ • Alerts enabled             │
      └─────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                        │
└─────────────────────────────────────────────────────────┘

Layer 1: Network Security
├─ HTTPS/TLS encryption
├─ DNS security (optional Cloudflare)
├─ DDoS protection (Vercel/Railway)
└─ Firewall rules (database whitelist)

Layer 2: Application Security
├─ Helmet.js (security headers)
├─ CORS whitelist
├─ Rate limiting (15 req/min)
├─ Input validation (express-validator)
└─ XSS protection (DOMPurify)

Layer 3: Data Security
├─ Environment variables (no secrets in code)
├─ MongoDB authentication
├─ Password hashing (if users added)
├─ Encryption at rest (MongoDB Atlas)
└─ Encryption in transit (TLS)

Layer 4: Operational Security
├─ No hardcoded credentials
├─ Logs don't contain sensitive data
├─ Error messages sanitized
├─ Audit logging active
└─ Access control setup
```

---

## Scalability Path

```
Phase 1: Current (Small)
┌──────────────────────────────────────┐
│ • Single Vercel instance             │
│ • Single Railway dyno                │
│ • MongoDB free tier                  │
│ • ~100-1000 users/day                │
│ • Cost: ~$5/month                    │
└──────────────────────────────────────┘
                   │
                   ▼
Phase 2: Growth (Medium) - Q2 2026
┌──────────────────────────────────────┐
│ • Vercel pro (priority builds)       │
│ • Railway standard tier              │
│ • MongoDB paid tier (10GB)           │
│ • Redis cache layer                  │
│ • CDN optimization                   │
│ • ~1000-10k users/day                │
│ • Cost: ~$50-100/month               │
└──────────────────────────────────────┘
                   │
                   ▼
Phase 3: Scale (Large) - Q4 2026
┌──────────────────────────────────────┐
│ • Multiple server regions            │
│ • Kubernetes orchestration           │
│ • MongoDB cluster (sharding)         │
│ • Elasticsearch for search           │
│ • Message queue (Bull/RabbitMQ)      │
│ • ~10k-100k users/day                │
│ • Cost: ~$500+/month                 │
└──────────────────────────────────────┘
```

---

## Technology Decision Matrix

| Layer | Technology | Why | Alternative |
|-------|-----------|-----|-------------|
| Frontend | React 18 | Modern, scalable, large ecosystem | Vue, Svelte |
| Build | Vite | Fast, modern, optimized | Webpack, Turbopack |
| Styling | Tailwind | Utility-first, production-optimized | CSS-in-JS, Sass |
| Backend | Express | Lightweight, flexible, battle-tested | Fastify, Koa |
| Database | MongoDB | Flexible schema, Atlas managed | PostgreSQL, Firebase |
| Email | Nodemailer | SMTP support, reliable | SendGrid, Mailgun |
| Security | Helmet | Comprehensive headers | Manual setup |
| Monitoring | Sentry | Best-in-class error tracking | Rollbar, DataDog |
| Frontend Hosting | Vercel | Optimized for React, auto-deploy | Netlify, GitHub Pages |
| Backend Hosting | Railway | Simple, affordable, MongoDB support | Heroku, Render |

---

## Backup & Disaster Recovery

```
Primary Database: MongoDB Atlas
├─ Automatic backups (daily)
├─ Point-in-time recovery (35 days)
└─ Replica set for high availability

Manual Backups (Monthly)
├─ Export to JSON
├─ Upload to S3/GitHub
└─ Document restore procedure

Code Backups
├─ GitHub (version history)
├─ GitHub Pages (static backup)
└─ Local machine

Environment Backups
├─ Vercel: Project JSON export
├─ Railway: Environment config backup
└─ Secrets stored in vault

Recovery Time Objective (RTO)
├─ Data loss: < 1 hour recovery
├─ Service outage: < 5 minutes recovery
└─ Configuration corruption: < 30 minutes
```

---

## Production Checklist

```
Infrastructure
☑ Vercel connected to GitHub
☑ Railway connected to GitHub
☑ MongoDB Atlas cluster created
☑ Sentry projects created
☑ Custom domain configured (optional)

Configuration
☑ All environment variables set
☑ Email credentials working
☑ Database connection verified
☑ CORS properly configured
☑ Rate limiting tested

Security
☑ HTTPS enabled
☑ Security headers verified
☑ Secrets not in code
☑ Database whitelist configured
☑ API authentication ready

Monitoring
☑ Sentry errors flowing
☑ Uptime monitoring active
☑ Alerting configured
☑ Logs accessible
☑ Performance dashboard setup

Testing
☑ Frontend loads without errors
☑ All API endpoints tested
☑ Contact form tested
☑ Mobile responsive verified
☑ Cross-browser tested

Documentation
☑ Deployment guide created
☑ Runbooks prepared
☑ Team trained
☑ Incident procedures defined
☑ Escalation paths clear
```

---

**Status:** Production Architecture Ready ✅  
**Last Updated:** December 5, 2025  
**Scalable to:** 1M+ requests/day
