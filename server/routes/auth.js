const express = require('express');
const { register, login, logged, logout } = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/logged', authenticateToken, logged);
router.get('/logout', authenticateToken, logout);

router.post('/register', register);
router.post('/login', login);

module.exports = router;