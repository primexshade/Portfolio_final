import rateLimit from 'express-rate-limit'

/** Basic rate limiter shared across routes */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // limit each IP to 300 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

/** Stricter limiter for contact form */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})
