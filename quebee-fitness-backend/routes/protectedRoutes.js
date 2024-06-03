const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Example of a protected route
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Welcome to your profile',
    user: req.user
  });
});

// Example of a protected route with role-based access control
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({
    message: 'Welcome to the admin page',
    user: req.user
  });
});

module.exports = router;

