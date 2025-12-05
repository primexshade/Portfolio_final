// Input validation and sanitization middleware
import { body, validationResult } from 'express-validator';

/**
 * Validation middleware for contact form
 * Validates and sanitizes all input fields
 */
export const validateContact = [
  // Validate and sanitize name
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .escape() // Escapes HTML characters to prevent XSS
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),

  // Validate and sanitize email
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail() // Normalizes email format
    .isLength({ max: 254 }).withMessage('Email must not exceed 254 characters'),

  // Validate and sanitize subject
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Subject must not exceed 200 characters')
    .escape(),

  // Validate and sanitize message
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
    .escape(), // Escapes HTML to prevent XSS attacks
];

/**
 * Middleware to handle validation errors
 * Returns 400 with error details if validation fails
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages,
    });
  }
  
  next();
};

/**
 * Validation middleware for project data (for admin use)
 */
export const validateProject = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
    .escape(),

  body('description')
    .trim()
    .notEmpty().withMessage('Project description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters')
    .escape(),

  body('technologies')
    .isArray({ min: 1 }).withMessage('At least one technology is required')
    .custom(value => {
      return value.every(tech => typeof tech === 'string' && tech.length > 0 && tech.length < 50);
    }).withMessage('Each technology must be a non-empty string less than 50 characters'),

  body('repository')
    .optional()
    .trim()
    .isURL().withMessage('Repository must be a valid URL'),

  body('liveURL')
    .optional()
    .trim()
    .isURL().withMessage('Live URL must be a valid URL'),

  body('featured')
    .optional()
    .isBoolean().withMessage('Featured must be a boolean value'),
];

/**
 * Generic XSS protection middleware
 * Sanitizes all request body values
 */
export const sanitizeRequestBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        // Remove any potential XSS vectors
        sanitized[key] = value
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      } else {
        sanitized[key] = value;
      }
    }
    
    req.body = sanitized;
  }
  
  next();
};

/**
 * Rate limiting - prevent brute force and spam
 * Tracks IP address and limits requests
 */
const requestTracker = new Map();

export const rateLimit = (windowMs, maxRequests) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requestTracker.has(ip)) {
      requestTracker.set(ip, []);
    }
    
    const requests = requestTracker.get(ip);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }
    
    validRequests.push(now);
    requestTracker.set(ip, validRequests);
    
    // Set retry-after header
    res.set('Retry-After', Math.ceil((validRequests[0] + windowMs - now) / 1000));
    
    next();
  };
};

export default {
  validateContact,
  handleValidationErrors,
  validateProject,
  sanitizeRequestBody,
  rateLimit,
};
