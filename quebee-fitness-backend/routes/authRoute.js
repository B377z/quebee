// routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

module.exports = router;
