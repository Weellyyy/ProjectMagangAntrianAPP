const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/permissionMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/me', authenticateToken, authController.getCurrentUser);
router.get('/verify', authenticateToken, authController.verifyToken);

module.exports = router;