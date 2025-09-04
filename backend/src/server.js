const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://stpeter.vercel.app', // Your Vercel frontend URL
    /\.vercel\.app$/, // Allow all Vercel preview deployments
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/divisions', require('./routes/divisions'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
// TEMPORARY - Remove after creating admin user
app.use('/api/admin', require('./routes/adminSetup'));

// Optional: test API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Only serve API routes - frontend is handled by Vercel
// Remove static file serving since frontend is deployed separately

// Catch-all route for undefined API endpoints
app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Set port
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
