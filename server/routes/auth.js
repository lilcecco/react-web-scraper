const express = require('express');
const { register, login, getCustomer, logout } = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/customer', authenticateToken, getCustomer);
router.get('/logout', authenticateToken, logout);

router.post('/register', register);
router.post('/login', login);

module.exports = router;