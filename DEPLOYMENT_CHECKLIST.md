# Production Deployment Checklist

## ✅ Completed Tasks

- [x] **Step 1:** Production build tested locally (npm run build)
- [x] **Step 2:** Environment files created (.env.production)
- [x] **Step 3:** Email SMTP configured (Gmail)
- [x] **Step 4a:** Frontend ready for deployment to Vercel
- [x] **Pre-deployment:** Credit Score added to About section

## 🔄 TODO - Next Steps (In Order)

### 1. Frontend Deployment (5-10 minutes)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Deploy: `cd mern-portfolio && vercel --prod`
- [ ] Note your Vercel deployment URL (e.g., https://portfolio-final.vercel.app)
- [ ] Add environment variables in Vercel Dashboard
- [ ] Test frontend loads correctly

### 2. Backend Deployment (10-15 minutes)
Choose ONE:

**Option A: Railway (Recommended)**
- [ ] Create Railway account: https://railway.app
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Login: `railway login`
- [ ] Deploy: `railway init` then `railway up`
- [ ] Note your Railway backend URL
- [ ] Configure environment variables

**Option B: Heroku**
- [ ] Create Heroku account: https://heroku.com
- [ ] Install Heroku CLI
- [ ] Create app: `heroku create portfolio-backend`
- [ ] Set environment variables
- [ ] Deploy: `git push heroku main`
- [ ] Note your Heroku backend URL

### 3. Connect Frontend & Backend (5 minutes)
- [ ] Copy backend URL from step 2
- [ ] Update Vercel env var: `VITE_API_BASE_URL=<backend-url>`
- [ ] Redeploy frontend on Vercel
- [ ] Test API calls (contact form, GitHub stats, LeetCode stats)

### 4. Custom Domain (Optional, 10-15 minutes)
- [ ] Go to Vercel Dashboard → Settings → Domains
- [ ] Add your custom domain
- [ ] Update DNS records with your domain provider
- [ ] Wait for DNS propagation (can take 24 hours)
- [ ] Update backend `CLIENT_ORIGIN` with your custom domain

### 5. Final Testing (10 minutes)
- [ ] Visit production URL in browser
- [ ] Test all pages load
- [ ] Test navigation
- [ ] Test contact form (should receive email)
- [ ] Verify GitHub stats load
- [ ] Verify LeetCode stats load
- [ ] Check browser console for errors

### 6. Monitoring Setup (Optional, 5 minutes)
- [ ] Configure Sentry for error tracking (optional)
- [ ] Set up uptime monitoring (optional)
- [ ] Configure email alerts (optional)

---

## 📋 Important Information to Have Ready

**Backend Credentials (Already Set):**
- MongoDB: mongodb+srv://aryan:JuLy2003@cluster0.0fwk4ct.mongodb.net/portfolioDB
- Email: aaryan.tiwari54@gmail.com
- SMTP Pass: jkcwhmouxsanafty

**GitHub Repository:**
- URL: https://github.com/primexshade/Portfolio_final.git
- Branch: master

**Will Be Generated During Deployment:**
- Vercel Frontend URL: _____________________
- Backend URL (Railway/Heroku): _____________________
- Custom Domain (if applicable): _____________________

---

## 🆘 Quick Troubleshooting

**Frontend build fails on Vercel:**
→ Check Vercel deployment logs, ensure package.json exists

**API returns 404:**
→ Verify VITE_API_BASE_URL in Vercel env variables

**CORS errors:**
→ Update backend CLIENT_ORIGIN environment variable

**Email not sending:**
→ Verify SMTP credentials are correct in backend env vars

**Cannot connect to MongoDB:**
→ Check MongoDB Atlas IP whitelist, ensure connection string is correct

---

## 📞 Support Links

- Vercel Documentation: https://vercel.com/docs
- Railway Documentation: https://docs.railway.app
- Heroku Documentation: https://devcenter.heroku.com
- MongoDB Atlas: https://docs.mongodb.com/atlas/
- GitHub: https://github.com/primexshade/Portfolio_final

---

## 🎯 Estimated Total Time

- Frontend deployment: 5-10 minutes
- Backend deployment: 10-15 minutes
- Connecting & testing: 10-15 minutes
- **Total: 25-40 minutes**

Let's get this live! 🚀
