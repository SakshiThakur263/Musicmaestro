const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const artistRoutes = require('./routes/artistRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Connect to Database
connectDB().then(async () => {
  // Auto-seed if database has no artists
  try {
    const Artist = require('./models/Artist');
    const count = await Artist.countDocuments();
    if (count === 0) {
      console.log('[Server]: No artists detected. Running auto-seed...');
      const seedDB = require('./utils/seedData');
      await seedDB();
    }
  } catch (err) {
    console.log('[Server]: Auto-seed check finished with note:', err.message);
  }
});

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'World of Musicians API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/artists', artistRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[WOM Server]: Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`[WOM Server]: Ready at http://localhost:${PORT}/api`);
  });
}

module.exports = app;
