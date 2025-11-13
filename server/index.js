import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import projectRoutes from './routes/projectRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import { apiLimiter, contactLimiter } from './middleware/rateLimiter.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()
console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

const app = express()
const PORT = process.env.PORT || 5000

// Security & basics
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))
app.set('trust proxy', 1)

// DB
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Set it in server/.env for DB features.')
} else {
  await connectDB(process.env.MONGODB_URI)
}

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

// API routes
app.use('/api', apiLimiter)
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactLimiter, contactRoutes)

// Optional proxy: GitHub user
app.get('/api/github', async (req, res, next) => {
  try {
    const username = req.query.username || 'octocat'
    const headers = { 'Accept': 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const r = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers })
    const data = await r.json()
    if (!r.ok) return res.status(r.status).json(data)
    res.json(data)
  } catch (err) { next(err) }
})

// Optional proxy: LeetCode stats
app.get('/api/leetcode', async (req, res, next) => {
  try {
    const username = req.query.username
    if (!username) return res.status(400).json({ message: 'username is required' })
    const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`)
    const data = await r.json()
    if (!r.ok) return res.status(r.status).json(data)
    res.json(data)
  } catch (err) { next(err) }
})

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
