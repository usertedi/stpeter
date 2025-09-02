const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @desc    Create initial admin user (TEMPORARY - Remove after use)
 * @route   POST /api/admin/setup
 * @access  Public (TEMPORARY)
 */
exports.createInitialAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }

    // Check if any admin user already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: 'Admin user already exists. This endpoint should only be used for initial setup.'
      });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Create admin user
    const adminUser = await User.create({
      name,
      email,
      password,
      isAdmin: true
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        isAdmin: adminUser.isAdmin
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
