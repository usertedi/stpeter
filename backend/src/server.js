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
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/divisions', require('./routes/divisions'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));

// Optional: test API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve static frontend build
const frontendBuildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendBuildPath));

// For any other route not starting with /api, serve index.html (React handles routing)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  }
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
