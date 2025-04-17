const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000; 

app.use(express.json()); 

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); 

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(port, () => { 
  console.log(`Serveur démarré sur le port ${port}`); 
});
