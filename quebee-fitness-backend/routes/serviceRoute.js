const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'manager'), createService)
  .get(getAllServices);

router.route('/:id')
  .get(getService)
  .put(protect, authorize('admin', 'manager'), updateService)
  .delete(protect, authorize('admin', 'manager'), deleteService);

module.exports = router;
