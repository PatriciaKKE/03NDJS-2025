const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/me', /*authMiddleware,*/ userController.getMe);
router.get('/', /*authMiddleware,*/ userController.getAllUsers);
router.delete('/:id', /*authMiddleware,*/ userController.deleteUser);

module.exports = router;
