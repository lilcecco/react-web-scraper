const express = require('express');
const { scrapeEmailFromWebsites, scrapeDataFromGoogleMaps, updateProcessType } = require('../controllers/scraper');
 
const router = express.Router();

router.post('/websites', scrapeEmailFromWebsites);
router.post('/google-maps', scrapeDataFromGoogleMaps);

router.put('/update-process-type', updateProcessType)

module.exports = router;