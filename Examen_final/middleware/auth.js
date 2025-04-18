const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, 'xUCgqueIYDfLEDsmOt1ujaXnuP1zSru2xsOocw87dHI=', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
