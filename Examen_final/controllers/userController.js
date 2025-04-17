const User = require('../models/User'); 

const getMe = (req, res) => { 
  
  const user = User.getById(req.user.id);
  if (!user) { 
    return res.status(404).json({ message: 'Utilisateur non trouvé' }); 
  }
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword); 
};

const getAllUsers = (req, res) => { 
  const users = User.getAll(); 
  const usersWithoutPasswords = users.map(user => { 
    const { password, ...userWithoutPassword } = user; 
    return userWithoutPassword;
  });
  res.json(usersWithoutPasswords); 
};

const deleteUser = (req, res) => { 
  const id = req.params.id; 
  if (!User.getById(id)) { 
    return res.status(404).json({ message: 'Utilisateur non trouvé' }); 
  }
  User.delete(id); 
  res.json({ message: 'Utilisateur supprimé' }); 
};

module.exports = { 
  getMe,
  getAllUsers,
  deleteUser
};
