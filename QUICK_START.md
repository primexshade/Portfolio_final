# 🚀 QUICK START GUIDE

## Right Now - Get Projects Working

```bash
# 1. Seed the database (from server folder)
cd server
npm run seed

# Expected output: ✨ Successfully seeded 6 projects

# 2. Refresh your browser at http://localhost:5173/projects
# You should see 6 beautiful animated project cards!
```

---

## Test Everything

```bash
# Test backend health
curl http://localhost:5001/api/health

# Get all projects
curl http://localhost:5001/api/projects

# Test frontend (should be running)
open http://localhost:5173
```

---

## Next: Contact Form

```bash
# Add to server/.env (use Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_TO=where-to-receive@gmail.com

# Restart server, then visit:
open http://localhost:5173/contact
```

---

## Next: GitHub Stats

```bash
# Optional: Add to server/.env for higher rate limits
GITHUB_TOKEN=ghp_your_token_here

# Visit GitHub page (no config needed)
open http://localhost:5173/github
```

---

## Next: LeetCode Stats

```bash
# No config needed, just visit:
open http://localhost:5173/leetcode

# Enter your LeetCode username in the input field
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Projects page empty | Run `npm run seed` in server folder |
| Backend not responding | Check it's running on port 5001 |
| MongoDB error | Verify MONGODB_URI in server/.env |
| CORS error | Check CLIENT_ORIGIN in server/.env |

---

## File Reference

- 📖 **Full docs**: `NEXT_STEPS.md`
- ✅ **Implementation status**: `IMPLEMENTATION_COMPLETE.md`
- 🔧 **This guide**: `QUICK_START.md`

---

## Project Structure

```
mern-portfolio/
├── client/                 # React + Vite (port 5173)
│   ├── src/
│   │   ├── pages/         # All 7 pages implemented ✅
│   │   ├── components/    # Navbar, Footer, etc. ✅
│   │   └── utils/         # API helpers ✅
│   └── .env               # VITE_API_BASE_URL=http://localhost:5001
│
├── server/                 # Express + MongoDB (port 5001)
│   ├── controllers/       # Project, Contact ✅
│   ├── models/            # Project, ContactMessage ✅
│   ├── routes/            # API routes ✅
│   ├── seedProjects.js    # Run this! 🌱
│   └── .env               # MongoDB URI, SMTP, etc.
│
└── NEXT_STEPS.md          # Your roadmap 🗺️
```

---

## Current Ports

- Frontend: **5173** (Vite dev server)
- Backend: **5001** (Express API)
- Database: **MongoDB Atlas** (cloud)

---

🎯 **You're all set!** Run the seed script and see your projects come to life! 🚀
