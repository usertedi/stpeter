const Division = require('../models/Division');

/**
 * @desc    Get all divisions
 * @route   GET /api/divisions
 * @access  Public
 */
exports.getDivisions = async (req, res) => {
  try {
    const divisions = await Division.find();

    res.status(200).json({
      success: true,
      count: divisions.length,
      data: divisions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get single division
 * @route   GET /api/divisions/:id
 * @access  Public
 */
exports.getDivision = async (req, res) => {
  try {
    const division = await Division.findById(req.params.id);

    if (!division) {
      return res.status(404).json({
        success: false,
        error: 'Division not found'
      });
    }

    res.status(200).json({
      success: true,
      data: division
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Create new division
 * @route   POST /api/divisions
 * @access  Private/Admin
 */
exports.createDivision = async (req, res) => {
  try {
    const division = await Division.create(req.body);

    res.status(201).json({
      success: true,
      data: division
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Update division
 * @route   PUT /api/divisions/:id
 * @access  Private/Admin
 */
exports.updateDivision = async (req, res) => {
  try {
    const division = await Division.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!division) {
      return res.status(404).json({
        success: false,
        error: 'Division not found'
      });
    }

    res.status(200).json({
      success: true,
      data: division
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Delete division
 * @route   DELETE /api/divisions/:id
 * @access  Private/Admin
 */
exports.deleteDivision = async (req, res) => {
  try {
    const division = await Division.findByIdAndDelete(req.params.id);

    if (!division) {
      return res.status(404).json({
        success: false,
        error: 'Division not found'
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