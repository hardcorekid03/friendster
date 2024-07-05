const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // console.log('Token verified, user ID:', _id); // Debug log
    const user = await User.findById(_id).select('_id');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    // console.log('Authenticated user:', req.user); // Debug log
    next();
  } catch (error) {
    // console.error('Authentication error:', error); // Debug log
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired'});
    }
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
