/**
 * Sentry Configuration for React Frontend
 * Client-side error tracking and performance monitoring
 * 
 * To use:
 * 1. Create Sentry account at https://sentry.io
 * 2. Create project for React frontend
 * 3. Set VITE_SENTRY_DSN in .env file
 * 4. Import and initialize in main.jsx before rendering
 */

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Initialize Sentry for frontend error tracking
 * Must be called before React is rendered
 * 
 * @param {Object} router - React Router instance
 */
export const initSentry = (router) => {
  Sentry.init({
    // DSN is the connection string provided by Sentry
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    
    // Set tracesSampleRate to 1.0 to capture 100% of transactions
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    
    // Set sample rate for error events
    sampleRate: 1.0,
    
    // Environment
    environment: import.meta.env.MODE || 'development',
    
    // Release version
    release: '1.0.0',
    
    // Enable debug in development
    debug: import.meta.env.MODE !== 'production',
    
    // Attach stack traces to all messages
    attachStacktrace: true,
    
    // React-specific settings
    beforeSend(event, hint) {
      // Filter out certain errors
      if (event.exception) {
        const error = hint.originalException;
        
        // Ignore network errors (often not useful)
        if (error?.message?.includes('Network Error')) {
          return null;
        }
        
        // Ignore cancelled requests
        if (error?.message?.includes('cancelled')) {
          return null;
        }
        
        // Ignore script errors from extensions
        if (error?.message?.includes('Script error')) {
          return null;
        }
      }
      
      return event;
    },
    
    // Integrations
    integrations: [
      // Browser tracing for performance monitoring
      new BrowserTracing({
        // Set sample rate for performance monitoring
        tracePropagationTargets: ['localhost', 'yourserver.io', /^\//],
        
        // Custom routing instrumentation (if using React Router)
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          window.history,
          router.routes
        ),
      }),
      
      // Replay integration to capture user sessions (optional)
      new Sentry.Replay({
        // Mask all text content by default
        maskAllText: true,
        blockAllMedia: true,
        // Sample rate for session replay
        sampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
      }),
    ],
    
    // Maximum breadcrumbs to keep
    maxBreadcrumbs: 50,
    
    // Request size limit
    maxValueLength: 1000,
    
    // Auto-session tracking
    autoSessionTracking: true,
    
    // Release tracking
    maxCacheItems: 30,
  });
};

/**
 * React Router instrumentation for Sentry
 * Automatically captures route changes
 */
export const createSentryReactRouterV6Integration = () => {
  return Sentry.createBrowserHistory();
};

/**
 * Higher-order component to wrap components with error boundary
 * Automatically captures React errors
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;

/**
 * Manually capture an exception
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context
 */
export const captureException = (error, context = {}) => {
  Sentry.withScope((scope) => {
    if (context.userId) scope.setUser({ id: context.userId });
    if (context.tags) Object.entries(context.tags).forEach(([key, value]) => scope.setTag(key, value));
    if (context.extra) Object.entries(context.extra).forEach(([key, value]) => scope.setContext(key, value));
    
    Sentry.captureException(error);
  });
};

/**
 * Manually capture a message
 * @param {string} message - The message to capture
 * @param {string} level - Log level (fatal, error, warning, info, debug)
 * @param {Object} context - Additional context
 */
export const captureMessage = (message, level = 'info', context = {}) => {
  Sentry.withScope((scope) => {
    if (context.tags) Object.entries(context.tags).forEach(([key, value]) => scope.setTag(key, value));
    if (context.extra) Object.entries(context.extra).forEach(([key, value]) => scope.setContext(key, value));
    
    Sentry.captureMessage(message, level);
  });
};

/**
 * Set user context for error tracking
 * @param {Object} user - User object with id, email, username
 */
export const setUser = (user) => {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    Sentry.setUser(null);
  }
};

/**
 * Add breadcrumb for tracking user actions
 * @param {string} message - Description of action
 * @param {string} category - Breadcrumb category
 * @param {Object} data - Additional data
 */
export const addBreadcrumb = (message, category = 'user-action', data = {}) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Start a performance transaction
 * @param {string} name - Transaction name
 * @param {string} op - Operation type
 */
export const startTransaction = (name, op = 'http.client') => {
  return Sentry.startTransaction({
    name,
    op,
  });
};

/**
 * Capture API performance metrics
 * @param {string} url - API endpoint
 * @param {number} duration - Request duration in ms
 * @param {string} method - HTTP method
 * @param {number} status - HTTP status code
 */
export const captureApiMetrics = (url, duration, method = 'GET', status = 200) => {
  Sentry.captureMessage(`API Call: ${method} ${url}`, 'info', {
    tags: {
      type: 'api_call',
      method,
      status,
    },
    extra: {
      duration_ms: duration,
      url,
    },
  });
};

/**
 * Report feedback for session replay
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} message - Feedback message
 */
export const reportFeedback = (name, email, message) => {
  Sentry.captureMessage(`User Feedback: ${message}`, 'info', {
    extra: {
      user_name: name,
      user_email: email,
      feedback_text: message,
    },
  });
};

/**
 * Health check for Sentry connection
 */
export const healthCheck = async () => {
  try {
    const client = Sentry.getClient();
    if (client && client.dsn) {
      return {
        status: 'ok',
        message: 'Sentry is properly configured',
        environment: import.meta.env.MODE,
        dsn: client.dsn?.toString() || 'unknown',
      };
    } else {
      return {
        status: 'warning',
        message: 'Sentry is not configured (DSN missing)',
        environment: import.meta.env.MODE,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      environment: import.meta.env.MODE,
    };
  }
};

export default {
  initSentry,
  SentryErrorBoundary,
  captureException,
  captureMessage,
  setUser,
  addBreadcrumb,
  startTransaction,
  captureApiMetrics,
  reportFeedback,
  healthCheck,
};
