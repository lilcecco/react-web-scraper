const express = require('express');
const { getScrapedData } = require('../controllers/scraper');
 
const router = express.Router();

router.post('/', getScrapedData);

module.exports = router;