const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

router.route('/all')
  .get(protect, authorize('admin', 'staff'), getAllBookings);

router.route('/:id')
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;
