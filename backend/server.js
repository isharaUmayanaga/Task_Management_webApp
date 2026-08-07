
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Import passport config
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(passport.initialize());

// Connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectToMongo();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
