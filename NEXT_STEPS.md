# 🚀 Next Phase Implementation Guide

## Current Status ✅
- ✅ Backend running on port 5001
- ✅ Frontend running on port 5173
- ✅ MongoDB Atlas connected
- ✅ Projects API fully functional (GET/POST)
- ✅ Projects page with responsive cards and animations

---

## Phase 2: Contact Form Integration

### Backend Tasks

1. **Verify Contact Controller** (`server/controllers/contactController.js`)
   - Already implemented ✅
   - Saves messages to MongoDB
   - Sends email via Nodemailer

2. **Configure SMTP** (in `server/.env`)
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=taryan54@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM="Aryan Tiwari <taryan54@gmail.com>"
   CONTACT_TO=taryan54@gmail.com
   ```

### Frontend Tasks

1. **Contact Page** (`client/src/pages/ContactPage.jsx`)
   - Already implemented ✅
   - Form validation
   - Success/error states
   - Framer Motion animations

2. **Test Flow**
   - Fill form → Submit → Check MongoDB (`contactMessages` collection)
   - Check email inbox for notification

---

## Phase 3: GitHub Stats Integration

### Backend (Optional Proxy)

Already implemented in `server/index.js`:
```javascript
app.get('/api/github', async (req, res) => {
  const username = req.query.username || 'octocat'
  // Proxies GitHub API with optional token
})
```

### Frontend Implementation

1. **GitHub Stats Page** (`client/src/pages/GitHubStats.jsx`)
   - Already implemented ✅
   - Uses `react-github-calendar` for contribution graph
   - Fetches user profile data

2. **Required Packages** (already in package.json)
   - `react-github-calendar` ✅
   - `axios` ✅

3. **Usage**
   - Update username in the page input field
   - Or set a default username in the component

4. **Optional: Add GitHub Token** (increases rate limit)
   ```env
   # server/.env
   GITHUB_TOKEN=ghp_your_token_here
   ```

---

## Phase 4: LeetCode Stats Integration

### Backend (Optional Proxy)

Already implemented in `server/index.js`:
```javascript
app.get('/api/leetcode', async (req, res) => {
  const username = req.query.username
  // Proxies leetcode-stats-api.herokuapp.com
})
```

### Frontend Implementation

1. **LeetCode Stats Page** (`client/src/pages/LeetCodeStats.jsx`)
   - Already implemented ✅
   - Displays solved problems (Easy/Medium/Hard)
   - Uses Recharts for radial bar chart
   - Shows ranking and total stats

2. **Required Packages** (already in package.json)
   - `recharts` ✅
   - `axios` ✅

3. **Usage**
   - Update username in the page input field
   - Or set a default username in the component

4. **API Source**
   - Uses: `https://leetcode-stats-api.herokuapp.com/<username>`
   - Returns: `{ totalSolved, totalQuestions, easySolved, mediumSolved, hardSolved, ranking }`

---

## Phase 5 (Optional): Admin Panel

### Authentication Setup

1. **Install Auth Packages**
   ```bash
   cd server
   npm install bcryptjs jsonwebtoken
   ```

2. **Create User Model** (`server/models/User.js`)
   ```javascript
   const UserSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['admin', 'user'], default: 'user' }
   })
   ```

3. **Add Auth Routes**
   - POST `/api/auth/register` → Create admin user
   - POST `/api/auth/login` → Return JWT token
   - Middleware to protect routes

4. **Protected Project Routes**
   - PUT `/api/projects/:id` → Update project
   - DELETE `/api/projects/:id` → Delete project
   - Add `auth` middleware to verify JWT

### Frontend Admin Panel

1. **Create Admin Pages**
   - `/admin/login` → Login form
   - `/admin/dashboard` → Protected route
   - `/admin/projects` → CRUD interface

2. **State Management**
   - Store JWT in localStorage
   - Add auth context or Redux slice
   - Redirect if not authenticated

---

## Testing Checklist

### Projects ✅
- [ ] Backend responds to GET /api/projects
- [ ] Backend accepts POST /api/projects
- [ ] Frontend displays all projects
- [ ] Images load correctly
- [ ] Links open in new tabs
- [ ] Animations work smoothly

### Contact Form
- [ ] Form validation works
- [ ] Message saves to MongoDB
- [ ] Email notification sent
- [ ] Success message displays
- [ ] Error handling works

### GitHub Stats
- [ ] Contribution calendar loads
- [ ] Profile data displays
- [ ] Username input works
- [ ] Error handling for invalid usernames

### LeetCode Stats
- [ ] Stats fetch successfully
- [ ] Chart renders correctly
- [ ] Data updates when username changes
- [ ] Error handling for invalid usernames

---

## Deployment Checklist

### Backend (Render)
- [ ] Create new Web Service
- [ ] Connect GitHub repo
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variables from `.env.example`
- [ ] Note the deployed URL

### Frontend (Vercel)
- [ ] Create new project
- [ ] Connect GitHub repo
- [ ] Set root directory: `client`
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Add env variable: `VITE_API_BASE_URL=<your-render-url>`

### Database (MongoDB Atlas)
- [ ] Create cluster
- [ ] Whitelist IP: 0.0.0.0/0 (allow all for cloud hosting)
- [ ] Create database user
- [ ] Get connection string
- [ ] Add to both local and Render env vars

---

## Quick Commands

```bash
# Install all dependencies
npm run install-all

# Start both servers (from root)
npm run dev

# Start backend only
cd server && npm run dev

# Start frontend only
cd client && npm run dev

# Seed sample projects
cd server && npm run seed

# Build frontend for production
cd client && npm run build
```

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/github?username=X` | Proxy GitHub user data |
| GET | `/api/leetcode?username=X` | Proxy LeetCode stats |

---

## Environment Variables Reference

### Server (`.env`)
```env
PORT=5001
MONGODB_URI=mongodb+srv://...
CLIENT_ORIGIN=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=taryan54@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Aryan Tiwari <taryan54@gmail.com>"
GITHUB_TOKEN=ghp_optional
```

### Client (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5001
```

---

## Troubleshooting

### Projects not loading?
1. Check backend is running: `http://localhost:5001/api/health`
2. Check MongoDB connection in server terminal
3. Run seed script: `npm run seed` in server folder
4. Check CORS settings in `server/index.js`

### Contact form not working?
1. Verify SMTP credentials in `server/.env`
2. For Gmail, use App Password (not regular password)
3. Check MongoDB connection
4. Check server logs for email errors

### GitHub/LeetCode not loading?
1. Check username is valid
2. Check API rate limits (add GITHUB_TOKEN if needed)
3. Verify backend proxy endpoints work: 
   - `http://localhost:5001/api/github?username=octocat`
   - `http://localhost:5001/api/leetcode?username=yourname`

---

✅ **All core features are implemented and ready to test!**
