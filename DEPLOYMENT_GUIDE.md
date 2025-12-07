# 🚀 Production Deployment Guide

## Quick Deploy Checklist

### ✅ Pre-Deployment
- [ ] All code committed to GitHub
- [ ] Environment variables documented
- [ ] MongoDB Atlas account created
- [ ] Email service configured

### 🎯 Step 1: Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `primexshade/Portfolio_final`
   - Select the repository

3. **Configure Service**
   ```
   Name: portfolio-backend
   Region: Choose closest to you
   Branch: master
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables** (in Render dashboard)
   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   PORT=5001
   NODE_ENV=production
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=<your-gmail>
   EMAIL_PASS=<your-app-password>
   EMAIL_FROM=<your-gmail>
   CLIENT_URL=<will-update-after-vercel>
   SENTRY_DSN=<optional>
   JWT_SECRET=<generate-random-string>
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build (3-5 minutes)
   - Copy your backend URL: `https://portfolio-backend-xxxx.onrender.com`

---

### 🌐 Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import `primexshade/Portfolio_final`

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=<your-render-backend-url>
   VITE_SENTRY_DSN=<optional>
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Get your URL: `https://your-portfolio.vercel.app`

6. **Update Backend CORS**
   - Go back to Render dashboard
   - Add environment variable:
     ```
     CLIENT_URL=https://your-portfolio.vercel.app
     ```
   - Redeploy backend

---

### 🗄️ Step 3: Set Up MongoDB Atlas

1. **Create Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free M0 cluster

2. **Configure Access**
   - Database Access → Add User (username/password)
   - Network Access → Add IP: `0.0.0.0/0` (allow all)

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Add to Render environment variables

4. **Seed Database** (Optional)
   ```bash
   cd server
   node seedProjects.js
   ```

---

### 📧 Step 4: Configure Email Service

**Option A: Gmail (Quick)**
1. Enable 2FA on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use in `EMAIL_PASS` environment variable

**Option B: SendGrid (Professional)**
1. Create account: https://sendgrid.com
2. Get API key
3. Update server email configuration

---

### 🧪 Step 5: Test Deployment

**Frontend Tests:**
- [ ] All pages load correctly
- [ ] Images and assets display
- [ ] Navigation works
- [ ] Mobile responsive

**Backend Tests:**
- [ ] Contact form submits
- [ ] Email received
- [ ] API endpoints respond
- [ ] Database queries work

**Integration Tests:**
- [ ] GitHub stats load
- [ ] LeetCode stats load
- [ ] Projects display
- [ ] Error tracking works

---

### 🎨 Step 6: Custom Domain (Optional)

**Vercel Domain:**
1. Buy domain (Namecheap, GoDaddy)
2. Vercel Settings → Domains
3. Add your domain
4. Update DNS records as shown

**SSL Certificate:**
- Automatic with Vercel & Render (HTTPS enabled)

---

### 📊 Step 7: Monitoring Setup

**Vercel Analytics:**
- Enable in project settings
- View traffic and performance

**Render Monitoring:**
- View logs in dashboard
- Set up alerts

**Sentry (Optional):**
1. Create account: https://sentry.io
2. Create project
3. Copy DSN
4. Add to environment variables

---

### 🔄 Step 8: Continuous Deployment

**Automatic Deploys:**
- Push to master → Auto-deploys to production
- Vercel: Instant deploy on git push
- Render: Auto-deploy on git push

**Preview Deploys:**
- Create branch → Get preview URL
- Test before merging to master

---

### 🆘 Troubleshooting

**Build Fails:**
- Check Node version (use v18+)
- Verify package.json scripts
- Check build logs for errors

**API Not Working:**
- Verify CORS settings
- Check environment variables
- Ensure MongoDB connected

**Email Not Sending:**
- Verify SMTP credentials
- Check app password (not regular password)
- Test with a simple email first

**404 Errors:**
- Ensure vercel.json has proper rewrites
- Check route configuration

---

### 📝 Post-Deployment

- [ ] Update README with live URLs
- [ ] Test all functionality
- [ ] Share portfolio link
- [ ] Set up Google Analytics (optional)
- [ ] Configure SEO meta tags
- [ ] Submit to Google Search Console

---

### 🔗 Useful Links

- Frontend: https://your-portfolio.vercel.app
- Backend: https://portfolio-backend.onrender.com
- Database: MongoDB Atlas Dashboard
- Repository: https://github.com/primexshade/Portfolio_final

---

### 💡 Tips

1. **Free Tier Limits:**
   - Render: Sleeps after 15 min inactivity (cold starts)
   - Vercel: 100GB bandwidth/month
   - MongoDB: 512MB storage

2. **Performance:**
   - Enable caching headers
   - Optimize images
   - Use CDN for assets

3. **Security:**
   - Keep environment variables secret
   - Enable rate limiting
   - Use HTTPS only
   - Regular dependency updates

---

**Need Help?** Check the logs in Vercel/Render dashboards for detailed error messages.
