/**
 * Sentry Configuration for Node.js Backend
 * Error tracking and performance monitoring setup
 * 
 * To use:
 * 1. Create Sentry account at https://sentry.io
 * 2. Create project for Node/Express backend
 * 3. Set SENTRY_DSN in .env file
 * 4. Import at the very top of index.js
 */

import * as Sentry from '@sentry/node';

/**
 * Initialize Sentry for error tracking and performance monitoring
 * Must be called before any other Sentry method
 */
export const initSentry = () => {
  Sentry.init({
    // DSN is the connection string provided by Sentry
    dsn: process.env.SENTRY_DSN || '',
    
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Set sample rate for error events
    sampleRate: 1.0,
    
    // Environment identifier
    environment: process.env.NODE_ENV || 'development',
    
    // Release version
    release: '1.0.0',
    
    // Enable debug mode in development
    debug: process.env.NODE_ENV !== 'production',
    
    // Attach stack traces to all messages
    attachStacktrace: true,
    
    // Include local variables in error reports (development only)
    includeLocalVariables: process.env.NODE_ENV !== 'production',
    
    // Integrations
    integrations: [
      // Enable HTTP Client integration for tracking outgoing HTTP requests
      new Sentry.Integrations.Http({ tracing: true }),
      
      // Enable Express integration for request/error tracking
      new Sentry.Integrations.Express({
        app: true,
        request: true,
      }),
      
      // Capture unhandled promise rejections
      new Sentry.Integrations.PromiseRejection(),
      
      // Capture global exception handler
      new Sentry.Integrations.GlobalHandlers(),
    ],
    
    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      // Random plugins
      'WXPlugin',
      'Can\'t find variable: ZiteReader',
      'jigsaw is not defined',
      'ComboSearch is not defined',
      // Random plugins
      '"bb_trackPage" is not a function',
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // See http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      'NonErrorPromiseRejectionWarning',
    ],
    
    // Deny URLs - don't send events from these URLs
    denyUrls: [
      // Random plugins
      /extensions\//i,
      /^chrome:\/\//i,
      /^about:/i,
      // Random plugins
      /^127\.0\.0\.1:4001\/isrunning/i,
      /flask/i,
    ],
    
    // Allow URLs - only send events from these URLs (optional)
    allowUrls: [
      // Development
      /localhost/i,
      /127\.0\.0\.1/i,
      // Production
      /\.app\.example\.com/i,
    ],
    
    // Maximum breadcrumbs to keep
    maxBreadcrumbs: 50,
    
    // Request size limit in characters
    maxValueLength: 1000,
    
    // Normalize event data
    normalizeDepth: 5,
  });
};

/**
 * Express middleware to capture errors
 * Use: app.use(Sentry.Handlers.errorHandler());
 */
export const errorHandler = () => Sentry.Handlers.errorHandler();

/**
 * Express middleware to request tracking
 * Use: app.use(Sentry.Handlers.requestHandler());
 */
export const requestHandler = () => Sentry.Handlers.requestHandler();

/**
 * Capture exception manually
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context data
 */
export const captureException = (error, context = {}) => {
  Sentry.withScope((scope) => {
    // Add custom context
    if (context.userId) scope.setUser({ id: context.userId });
    if (context.tags) Object.entries(context.tags).forEach(([key, value]) => scope.setTag(key, value));
    if (context.extra) Object.entries(context.extra).forEach(([key, value]) => scope.setContext(key, value));
    
    // Capture the exception
    Sentry.captureException(error);
  });
};

/**
 * Capture a message manually
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
 * Start a performance transaction
 * @param {string} name - Transaction name
 * @param {string} op - Operation type
 */
export const startTransaction = (name, op = 'http.server') => {
  return Sentry.startTransaction({
    name,
    op,
  });
};

/**
 * Async wrapper to capture errors in async functions
 * @param {Function} fn - Async function to wrap
 */
export const withErrorCapture = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      captureException(error);
      throw error;
    }
  };
};

/**
 * Health check endpoint
 * Used to verify Sentry configuration
 */
export const healthCheck = async () => {
  try {
    const client = Sentry.getClient();
    if (client && client.dsn) {
      return {
        status: 'ok',
        message: 'Sentry is properly configured',
        environment: process.env.NODE_ENV,
        dsn: client.dsn.toString(),
      };
    } else {
      return {
        status: 'warning',
        message: 'Sentry is not configured (DSN missing)',
        environment: process.env.NODE_ENV,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      environment: process.env.NODE_ENV,
    };
  }
};

export default {
  initSentry,
  errorHandler,
  requestHandler,
  captureException,
  captureMessage,
  startTransaction,
  withErrorCapture,
  healthCheck,
};
