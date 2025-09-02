const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  deleteContactSubmission
} = require('../controllers/contact');

// Public routes
router.post('/', submitContactForm);

// Protected admin routes
router.get('/', protect, admin, getContactSubmissions);
router.get('/:id', protect, admin, getContactSubmission);
router.put('/:id', protect, admin, updateContactStatus);
router.delete('/:id', protect, admin, deleteContactSubmission);

module.exports = router;