# Deployment Guide

## Step 4: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free tier available at https://vercel.com)
- GitHub account with your repository connected
- Node.js and npm installed locally

### Option A: Deploy via Vercel CLI (Recommended for quick setup)

1. **Install Vercel CLI globally:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```
Follow the prompts to authenticate with your GitHub account.

3. **Deploy from the project root:**
```bash
cd /Users/aryantiwari/Documents/portfolio/mern-portfolio
vercel --prod
```

4. **Configure environment variables during deployment:**
When prompted, select:
- Project name: `portfolio-final` (or your preference)
- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `client/dist`

5. **Add environment variables in Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Select your project
   - Settings → Environment Variables
   - Add:
     ```
     VITE_API_BASE_URL=https://your-backend-url.com
     VITE_SENTRY_DSN=(optional)
     VITE_RECAPTCHA_SITE_KEY=(optional)
     ```

### Option B: Deploy via GitHub Integration (Auto-deployment on push)

1. **Push your code to GitHub:**
```bash
git push origin master
```

2. **Connect GitHub to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `Portfolio_final` repository
   - Configure:
     - Framework: Vite
     - Build command: `npm run build`
     - Output directory: `client/dist`
     - Root directory: `./`

3. **Add environment variables in Vercel Dashboard:**
   - Settings → Environment Variables
   - Add the same variables as Option A

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy from GitHub

### Verification Steps

After deployment:

1. **Check deployment status:**
   - Visit https://vercel.com/dashboard
   - View deployment logs
   - Ensure build succeeded (green checkmark)

2. **Test your frontend:**
   - Visit the Vercel URL provided (e.g., https://portfolio-final.vercel.app)
   - Verify pages load correctly
   - Test navigation between sections

3. **Common issues and fixes:**
   - If build fails, check the Vercel logs for errors
   - If pages don't load, verify `VITE_API_BASE_URL` is correct
   - If API calls fail, backend may not be deployed yet (proceed to Step 5)

---

## Step 5: Deploy Backend to Railway (Recommended) or Heroku

### Option A: Railway (Simpler, Recommended)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Initialize Railway project:**
```bash
cd /Users/aryantiwari/Documents/portfolio/mern-portfolio/server
railway init
```
Follow prompts:
- Name: `portfolio-backend`
- Select MongoDB plugin when asked

4. **Add environment variables:**
```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=mongodb+srv://aryan:JuLy2003@cluster0.0fwk4ct.mongodb.net/portfolioDB
railway variables set CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
railway variables set SMTP_USER=aaryan.tiwari54@gmail.com
railway variables set SMTP_PASS=jkcwhmouxsanafty
railway variables set SMTP_FROM="Aryan Tiwari Portfolio <aaryan.tiwari54@gmail.com>"
railway variables set CONTACT_TO=aaryan.tiwari54@gmail.com
```

5. **Deploy:**
```bash
railway up
```

6. **Get your Railway backend URL:**
```bash
railway domain
```
This will give you a URL like: `https://portfolio-backend-production.up.railway.app`

### Option B: Heroku (Alternative)

1. **Install Heroku CLI:**
```bash
brew tap heroku/brew && brew install heroku
```

2. **Login:**
```bash
heroku login
```

3. **Create app:**
```bash
heroku create portfolio-backend
```

4. **Add buildpacks:**
```bash
heroku buildpacks:add heroku/nodejs
```

5. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://aryan:JuLy2003@cluster0.0fwk4ct.mongodb.net/portfolioDB
heroku config:set CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
heroku config:set SMTP_USER=aaryan.tiwari54@gmail.com
heroku config:set SMTP_PASS=jkcwhmouxsanafty
heroku config:set SMTP_FROM="Aryan Tiwari Portfolio <aaryan.tiwari54@gmail.com>"
heroku config:set CONTACT_TO=aaryan.tiwari54@gmail.com
```

6. **Deploy:**
```bash
git push heroku main
```

---

## Step 6: Update Frontend with Backend URL

After backend deployment:

1. **Get your backend URL:**
   - Railway: `https://portfolio-backend-production.up.railway.app`
   - Heroku: `https://portfolio-backend-xxxxx.herokuapp.com`

2. **Update Vercel environment variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_BASE_URL` with your backend URL
   - Redeploy: Click "Deployments" → "Redeploy" latest

3. **Verify API calls work:**
   - Visit your Vercel domain
   - Check browser console (F12) for any API errors
   - Test contact form submission

---

## Step 7: Connect Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS instructions for your domain provider

2. **Update backend CLIENT_ORIGIN:**
   ```bash
   # For Railway:
   railway variables set CLIENT_ORIGIN=https://yourdomain.com
   
   # For Heroku:
   heroku config:set CLIENT_ORIGIN=https://yourdomain.com
   ```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend build fails on Vercel | Check Vercel logs, ensure all dependencies are installed |
| API requests return 404 | Verify `VITE_API_BASE_URL` matches your backend URL |
| CORS errors | Ensure backend `CLIENT_ORIGIN` includes your frontend domain |
| Email not sending | Verify SMTP credentials are correct in backend env vars |
| Contact form returns 500 | Check backend logs for MongoDB or email errors |

---

## Quick Reference

**Frontend URL:** https://your-vercel-domain.vercel.app  
**Backend URL:** https://your-backend-url.com  
**Vercel Dashboard:** https://vercel.com/dashboard  
**Railway Dashboard:** https://railway.app  
**MongoDB Atlas:** https://cloud.mongodb.com  

Your deployment is production-ready!
