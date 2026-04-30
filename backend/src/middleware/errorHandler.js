/**
 * Custom error handler middleware
 * Provides consistent error responses across the API
 */
const errorHandler = (err, req, res, next) => {
  // Log error for server-side debugging
  console.error(err.stack || err);

  // Default error object
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Server Error'
    : error.message || 'Server Error';

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler;