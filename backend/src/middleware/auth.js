const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes that require authentication
 * Verifies the JWT token and attaches the user to the request object
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

/**
 * Middleware to restrict access to admin users only
 * Must be used after the protect middleware
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({ success: false, error: 'Not authorized as an admin' });
};

module.exports = { protect, admin };