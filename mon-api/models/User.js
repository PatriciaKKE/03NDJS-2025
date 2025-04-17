let users = []; 

module.exports = { 
  getAll: () => users, 
  getById: (id) => users.find(user => user.id === id), 
  getByEmail: (email) => users.find(user => user.email === email), 
  create: (user) => {
    user.id = Math.random().toString(36).substring(2, 15);
    users.push(user); 
    return user; 
  },
  delete: (id) => { 
    users = users.filter(user => user.id !== id); 
  }
};
