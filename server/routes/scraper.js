const express = require('express');
const { scrapeEmailFromWebsites, scrapeDataFromGoogleMaps } = require('../controllers/scraper');
 
const router = express.Router();

router.post('/websites', scrapeEmailFromWebsites);
router.post('/google-maps', scrapeDataFromGoogleMaps);

module.exports = router;