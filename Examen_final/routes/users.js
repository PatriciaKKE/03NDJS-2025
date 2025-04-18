const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/auth');

router.get('/me', authMiddleware, userControllers.getMe);
router.get('/', authMiddleware, userControllers.getAllUsers);
router.delete('/:id', authMiddleware, userControllers.deleteUser);

module.exports = router;
