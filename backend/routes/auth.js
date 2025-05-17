
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

// Get current user
router.get('/me', protect, authController.getCurrentUser);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
