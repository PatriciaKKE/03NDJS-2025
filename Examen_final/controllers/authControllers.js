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
    console.log('Début de la fonction login'); 
    const { email, password } = req.body;
    console.log('Email:', email); 
    console.log('Password:', password); 

    
    const user = User.getByEmail(email);
    console.log('User:', user); 
    if (!user) {
      console.log('Utilisateur non trouvé'); 
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('isPasswordValid:', isPasswordValid);
    if (!isPasswordValid) {
    console.log('Mot de passe invalide'); 
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    
    const token = jwt.sign({ id: user.id }, 'fdsFDu2H9L4Apl6C3CD6BTvSoPJnm7vHuzTOlxZWEDE=', { expiresIn: '24h' });
    console.log('Token:', token);
    
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
