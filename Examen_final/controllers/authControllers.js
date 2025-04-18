const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => { 
  try {
    const { email, password } = req.body;

    
    if (User.getByEmail(email)) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = User.create({ email, password: hashedPassword });

   
    const { password: excludedPassword, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};

const login = async (req, res, next) => { 
  try {
    const { email, password } = req.body;

    
    const user = User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    
    const token = jwt.sign({ id: user.id }, 'VOTRE_CLE_SECRETE', { expiresIn: '1h' });

    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

module.exports = {
  register,
  login
};
