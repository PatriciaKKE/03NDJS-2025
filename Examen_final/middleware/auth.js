const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  console.log('Début du middleware d\'authentification');
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    console.log('Token manquant');
    return res.status(401).json({ message: 'Token inexistant' });
  }

  jwt.verify(token, 'fdsFDu2H9L4Apl6C3CD6BTvSoPJnm7vHuzTOlxZWEDE=', (err, decoded) => { 
    if (err) {
      console.log('Token invalide:', err.message);
      return res.status(403).json({ message: 'Token invalide' });
    }

    const userId = decoded.id; 


    const user = User.getById(userId);

    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('Utilisateur vérifié:', user);
    req.user = user; 
    next();
  });
};

module.exports = authMiddleware;
