const express = require('express');
const { register, login, logout, resetPasswordEmail, verifyResetPasswordToken, resetPassword } = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/logout', authenticateToken, logout);

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password-email', resetPasswordEmail);
router.post('/verify-reset-password-token', verifyResetPasswordToken);
router.post('/reset-password', resetPassword);

module.exports = router;