const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '1mb' }));
app.use(fileUpload({
  limits: { fileSize: Number(process.env.MAX_FILE_UPLOAD) || 10 * 1024 * 1024 },
  abortOnLimit: true,
}));
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://stpeter.vercel.app', // Your Vercel frontend URL
    /\.vercel\.app$/, // Allow all Vercel preview deployments
  ],
  credentials: true,
};
app.use(cors(corsOptions));

const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.PUBLIC_WRITE_RATE_LIMIT) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts, please try again later' },
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/forgotpassword', authLimiter);
app.use('/api/contact', (req, res, next) => (
  req.method === 'POST' ? publicWriteLimiter(req, res, next) : next()
));

app.use(['/api/events', '/api/divisions', '/api/gallery'], (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  }

  next();
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/divisions', require('./routes/divisions'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));

// Temporary setup route: available in development, or explicitly enabled in production.
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_ADMIN_SETUP === 'true') {
  app.use('/api/admin', require('./routes/adminSetup'));
}

// Optional: test API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
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
