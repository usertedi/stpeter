const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision
} = require('../controllers/divisions');

// Public routes
router.get('/', getDivisions);
router.get('/:id', getDivision);

// Protected admin routes
router.post('/', protect, admin, createDivision);
router.put('/:id', protect, admin, updateDivision);
router.delete('/:id', protect, admin, deleteDivision);

module.exports = router;