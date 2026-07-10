const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
const protect = async (req, res, next) => {
  let token;
 
  // Token is expected in the format: "Bearer <token>"
  const authHeader = req.headers.authorization;
 
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = authHeader.split(' ')[1];
 
      // Verify token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
      // Attach user (without password) to request object
      req.user = await User.findById(decoded.id).select('-password');
 
      if (!req.user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }
 
      next(); // proceed to the next middleware/controller
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
 
module.exports = { protect };
