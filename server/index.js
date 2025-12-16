import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { connectDB } from './config/db.js'
import projectRoutes from './routes/projectRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import { apiLimiter, contactLimiter } from './middleware/rateLimiter.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

// Initialize Sentry BEFORE anything else
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    sampleRate: 1.0,
    integrations: [
      nodeProfilingIntegration(),
    ],
    debug: process.env.NODE_ENV !== 'production',
    release: '1.0.0',
    maxBreadcrumbs: 50,
  })
}

console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);
console.log("🔍 SENTRY_DSN:", process.env.SENTRY_DSN ? '✅ Configured' : '⚠️ Not configured');

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
    const username = req.query.username || 'primexshade'
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
    
    // Using LeetCode GraphQL API
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `
    
    const r = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username } })
    })
    
    const result = await r.json()
    
    if (result.errors || !result.data?.matchedUser) {
      return res.status(404).json({ message: 'User not found or API error' })
    }
    
    const stats = result.data.matchedUser.submitStats.acSubmissionNum
    const allQuestions = result.data.allQuestionsCount
    
    const transformedData = {
      totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
      totalQuestions: allQuestions.find(q => q.difficulty === 'All')?.count || 0,
      easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
      hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
      ranking: result.data.matchedUser.profile?.ranking || null
    }
    
    res.json(transformedData)
  } catch (err) { next(err) }
})

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
