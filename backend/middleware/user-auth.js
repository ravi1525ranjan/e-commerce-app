const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');


// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jsonwebtoken.verify(token, '9876@12345');
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  next();
}

module.exports = {
  authenticateUser,
  isAdmin,
  isAuthenticated
};