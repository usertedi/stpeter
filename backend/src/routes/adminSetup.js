const express = require('express');
const router = express.Router();
const { createInitialAdmin } = require('../controllers/adminSetup');

// TEMPORARY ROUTE - Remove after creating admin user
router.post('/setup', createInitialAdmin);

module.exports = router;
