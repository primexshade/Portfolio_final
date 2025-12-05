import { Router } from 'express'
import { sendContact } from '../controllers/contactController.js'
import { validateContact, handleValidationErrors, sanitizeRequestBody } from '../middleware/validation.js'

const router = Router()

/**
 * POST /api/contact
 * Submit a contact form with enhanced validation and sanitization
 * 
 * Request body:
 * - name: string (required, 2-100 chars, letters/spaces/hyphens/apostrophes only)
 * - email: string (required, valid email format)
 * - message: string (required, 10-5000 chars)
 * - subject: string (optional, max 200 chars)
 * 
 * Response:
 * - success: boolean
 * - message: string
 * - errors: array (if validation failed)
 */
router.post(
  '/',
  sanitizeRequestBody,
  validateContact,
  handleValidationErrors,
  sendContact
)

export default router
