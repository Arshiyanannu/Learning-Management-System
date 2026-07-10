const express = require('express');
const router = express.Router();
 
const { registerUser, loginUser, getMyProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
 
// @route   POST /api/auth/register
// @desc    Register a new user (student or admin)
router.post('/register', registerUser);
 
// @route   POST /api/auth/login
// @desc    Login an existing user
router.post('/login', loginUser);
 
// @route   GET /api/auth/me
// @desc    Get the currently logged-in user's profile
router.get('/me', protect, getMyProfile);
 
module.exports = router;
