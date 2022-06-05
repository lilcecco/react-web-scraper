const express = require('express');
const { getProcesses, getBlacklist, setProcess, deleteProcess, setBlacklistElement, deleteBlacklistElement, getUser, updateUser } = require('../controllers/data');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/processes', getProcesses);
router.get('/blacklist', getBlacklist);
router.get('/user', authenticateToken, getUser);

router.post('/processes', setProcess);
router.post('/blacklist', setBlacklistElement);

router.put('/user', authenticateToken, updateUser);

router.delete('/process', deleteProcess);
router.delete('/blacklist', deleteBlacklistElement);

module.exports = router;