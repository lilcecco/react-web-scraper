const express = require('express');
const { register, login, token, logout, posts } = require('../controllers/auth');

const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/posts', authenticateToken, posts);
router.post('/login', login);
router.post('/token', token);
router.delete('logout', logout);

module.exports = router;