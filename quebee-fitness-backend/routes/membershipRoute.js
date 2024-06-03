const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createMembership,
  getUserMemberships,
  updateMembership,
  deleteMembership
} = require('../controllers/membershipController');

const router = express.Router();

router.route('/')
  .post(protect, createMembership)
  .get(protect, getUserMemberships);

router.route('/:id')
  .put(protect, updateMembership)
  .delete(protect, deleteMembership);

module.exports = router;
