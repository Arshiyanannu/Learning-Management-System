const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, please log in' });
    }
 
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Requires role: ${allowedRoles.join(' or ')}`,
      });
    }
 
    next(); // user has the correct role, proceed
  };
};
 
module.exports = { authorizeRoles };
 