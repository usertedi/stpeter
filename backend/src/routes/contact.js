const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  deleteContactSubmission
} = require('../controllers/contact');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 20 }).withMessage('Phone number cannot be more than 20 characters'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 100 }).withMessage('Subject cannot be more than 100 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
];

const statusValidation = [
  body('status').isIn(['new', 'read', 'responded']).withMessage('Invalid contact status'),
];

// Public routes
router.post('/', contactValidation, validate, submitContactForm);

// Protected admin routes
router.get('/', protect, admin, getContactSubmissions);
router.get('/:id', protect, admin, getContactSubmission);
router.put('/:id', protect, admin, statusValidation, validate, updateContactStatus);
router.delete('/:id', protect, admin, deleteContactSubmission);

module.exports = router;