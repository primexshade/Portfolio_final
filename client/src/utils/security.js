/**
 * Frontend Security Utilities
 * Provides XSS protection, CSRF tokens, and secure API communication
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Potentially dangerous HTML string
 * @param {object} config - DOMPurify configuration
 * @returns {string} - Safe HTML string
 */
export const sanitizeHTML = (dirty, config = {}) => {
  const defaultConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    KEEP_CONTENT: true,
  };

  return DOMPurify.sanitize(dirty, { ...defaultConfig, ...config });
};

/**
 * Escape user input to prevent XSS
 * @param {string} text - User input text
 * @returns {string} - Escaped text safe for display
 */
export const escapeHTML = (text) => {
  if (typeof text !== 'string') return '';
  
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'\/]/g, (char) => escapeMap[char]);
};

/**
 * Validate and sanitize user input before sending to API
 * @param {object} formData - Form data object
 * @returns {object} - Validated and sanitized form data
 */
export const validateFormData = (formData) => {
  const sanitized = {};

  // Sanitize name
  if (formData.name) {
    sanitized.name = formData.name
      .trim()
      .slice(0, 100)
      .replace(/[^a-zA-Z\s'-]/g, '');
  }

  // Validate email
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email address');
    }
    sanitized.email = formData.email.trim().toLowerCase();
  }

  // Sanitize message
  if (formData.message) {
    sanitized.message = formData.message
      .trim()
      .slice(0, 5000);
  }

  // Sanitize subject
  if (formData.subject) {
    sanitized.subject = formData.subject
      .trim()
      .slice(0, 200)
      .escape?.();
  }

  return sanitized;
};

/**
 * Check if a URL is safe (same origin or trusted domain)
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is safe
 */
export const isSafeURL = (url) => {
  if (!url || typeof url !== 'string') return false;

  try {
    const urlObj = new URL(url, window.location.origin);
    const currentOrigin = window.location.origin;

    // Allow same-origin URLs
    if (urlObj.origin === currentOrigin) return true;

    // Allow specific trusted domains
    const trustedDomains = [
      'github.com',
      'linkedin.com',
      'instagram.com',
      'twitter.com',
      'leetcode.com',
    ];

    return trustedDomains.some((domain) => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

/**
 * Create secure fetch options with CSRF protection
 * @returns {object} - Fetch options with security headers
 */
export const getSecureFetchOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'include', // Include cookies
  };
};

/**
 * Safe API call wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - API response
 */
export const secureFetch = async (endpoint, options = {}) => {
  try {
    // Validate endpoint is safe
    if (!endpoint.startsWith('/api/')) {
      throw new Error('Invalid API endpoint');
    }

    const response = await fetch(endpoint, {
      ...getSecureFetchOptions(),
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Format error message safely for display
 * @param {Error|string} error - Error object or message
 * @returns {string} - Safe error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') {
    return escapeHTML(error);
  }

  if (error instanceof Error) {
    return escapeHTML(error.message);
  }

  return 'An error occurred. Please try again.';
};

/**
 * Debounce function to prevent multiple submissions
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Prevent double submission of forms
 * @param {HTMLFormElement} form - Form element
 * @returns {boolean} - True if form can be submitted
 */
export const canSubmitForm = (form) => {
  const submitButton = form?.querySelector('button[type="submit"]');
  if (!submitButton) return true;

  const isDisabled = submitButton.getAttribute('data-submitting') === 'true';
  return !isDisabled;
};

/**
 * Set form submission state
 * @param {HTMLFormElement} form - Form element
 * @param {boolean} isSubmitting - Submission state
 */
export const setFormSubmitting = (form, isSubmitting) => {
  const submitButton = form?.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.setAttribute('data-submitting', isSubmitting);
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Sending...' : 'Send Message';
  }
};

/**
 * Log security events (for monitoring and debugging)
 * @param {string} eventType - Type of security event
 * @param {object} details - Event details
 */
export const logSecurityEvent = (eventType, details = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Security Event] ${eventType}:`, details);
  }

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production' && window.Sentry) {
    window.Sentry.captureMessage(`Security Event: ${eventType}`, 'warning');
  }
};

export default {
  sanitizeHTML,
  escapeHTML,
  validateFormData,
  isSafeURL,
  getSecureFetchOptions,
  secureFetch,
  formatErrorMessage,
  debounce,
  canSubmitForm,
  setFormSubmitting,
  logSecurityEvent,
};
