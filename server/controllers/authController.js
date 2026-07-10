const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
// Helper function to generate a JWT token for a given user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
 
// @desc    Register a new user (student or admin)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
 
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
 
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
 
    // Create new user
    // Note: role defaults to "student" if not provided (see User model)
    const user = await User.create({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'student', // simple safeguard
    });
 
    // Respond with user info and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
 
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
 
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
 
    // Compare entered password with hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
 
    // Respond with user info and token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
 
// @desc    Get logged-in user's profile
// @route   GET /api/users/me  (mounted under /api/auth/me in routes)
// @access  Private
const getMyProfile = async (req, res) => {
  try {
    // req.user is set by the authMiddleware after verifying the token
    const user = await User.findById(req.user._id).select('-password');
 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};
 
module.exports = { registerUser, loginUser, getMyProfile };
