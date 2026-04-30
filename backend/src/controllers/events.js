const Event = require('../models/Event');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const eventListFields = 'title description date time location isRecurring recurrencePattern image featured category createdAt';

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
exports.getEvents = async (req, res) => {
  try {
    const pagination = getPagination(req.query, { defaultLimit: 50, maxLimit: 100 });
    const [events, total] = await Promise.all([
      Event.find()
        .select(eventListFields)
        .sort({ date: 1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      Event.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      count: events.length,
      pagination: getPaginationMeta({ ...pagination, total }),
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get upcoming events
 * @route   GET /api/events/upcoming
 * @access  Public
 */
exports.getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      date: { $gte: today }
    })
      .select(eventListFields)
      .sort({ date: 1 })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get weekly events
 * @route   GET /api/events/weekly
 * @access  Public
 */
exports.getWeeklyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isRecurring: true,
      recurrencePattern: 'weekly'
    })
      .select(eventListFields)
      .sort({ date: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get single event
 * @route   GET /api/events/:id
 * @access  Public
 */
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select(eventListFields).lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private/Admin
 */
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Update event
 * @route   PUT /api/events/:id
 * @access  Private/Admin
 */
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private/Admin
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};