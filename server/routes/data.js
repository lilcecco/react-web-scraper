const express = require('express');
const { getProcesses, getBlacklist, setProcess, deleteProcess, setBlacklistElement, deleteBlacklistElement } = require('../controllers/data');

const router = express.Router();

router.get('/processes', getProcesses);
router.get('/blacklist', getBlacklist);

router.post('/processes', setProcess);
router.post('/blacklist', setBlacklistElement);

router.delete('/process', deleteProcess);
router.delete('/blacklist', deleteBlacklistElement);

module.exports = router;