const express = require('express');
const { getProcesses, getBlacklist, getProducts, getNotices, getUser,
        setProcess, setBlacklistElement,
        deleteProcess, deleteBlacklistElement 
    } = require('../controllers/data');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/processes', authenticateToken, getProcesses);
router.get('/blacklist', getBlacklist);
router.get('/products', getProducts);
router.get('/notices', getNotices);
router.get('/user', authenticateToken, getUser);

router.post('/processes', setProcess);
router.post('/blacklist', setBlacklistElement);

router.delete('/process', deleteProcess);
router.delete('/blacklist', deleteBlacklistElement);

module.exports = router;