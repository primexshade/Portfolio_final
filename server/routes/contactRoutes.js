import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { sendContact } from '../controllers/contactController.js'

const router = Router()

router.post(
  '/',
  [
    body('name').isString().isLength({ min: 1 }).withMessage('name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('message').isString().isLength({ min: 5 }).withMessage('message must be at least 5 chars'),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }
    return sendContact(req, res, next)
  }
)

export default router
