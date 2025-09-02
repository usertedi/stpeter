const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getWeeklyEvents
} = require('../controllers/events');

// Public routes
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/weekly', getWeeklyEvents);
router.get('/:id', getEvent);

// Protected admin routes
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;