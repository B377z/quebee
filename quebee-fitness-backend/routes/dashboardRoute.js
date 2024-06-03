const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getUserDashboard,
  getStaffDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');

const router = express.Router();

// General user dashboard
router.get('/user', protect, authorize('customer'), getUserDashboard);

// Staff dashboard
router.get('/staff', protect, authorize('staff'), getStaffDashboard);

// Admin/Manager dashboard
router.get('/admin', protect, authorize('admin', 'manager'), getAdminDashboard);

module.exports = router;
