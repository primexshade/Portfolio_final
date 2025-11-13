import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { getProjects, createProject } from '../controllers/projectController.js'

const router = Router()

// GET all projects
router.get('/', getProjects)

// POST create project with basic validation
router.post(
  '/',
  [
    body('title').isString().isLength({ min: 1 }).withMessage('title is required'),
    body('description').isString().isLength({ min: 1 }).withMessage('description is required'),
    body('techStack').optional().isArray().withMessage('techStack must be an array of strings'),
  ],
  (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: result.array() })
    }
    return createProject(req, res, next)
  }
)

export default router
