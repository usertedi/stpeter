const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/auth');

// Public routes
// router.post('/register', register); // Disable in production
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes (require authentication)
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

// Admin routes
router.get('/users', protect, admin, getUsers);
router.get('/users/:id', protect, admin, getUser);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;