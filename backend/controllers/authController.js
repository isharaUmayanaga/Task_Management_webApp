
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Handle Google OAuth callback
exports.googleCallback = (req, res) => {
  try {
    // User is already authenticated by passport
    const token = generateToken(req.user._id);
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Redirect to frontend
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, picture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, picture },
      { new: true, runValidators: true, select: '-__v' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete profile and user tasks
exports.deleteProfile = async (req, res) => {
  try {
    await Task.deleteMany({ createdBy: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user
exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
