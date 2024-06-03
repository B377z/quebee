const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/profileController');

const router = express.Router();

router.route('/').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
