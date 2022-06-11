const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/logout', authenticateToken, logout);

router.post('/register', register);
router.post('/login', login);

module.exports = router;