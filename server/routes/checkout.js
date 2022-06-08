const express = require('express');
const { createCheckoutSession, createPortalSession, webhook } = require('../controllers/checkout');

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-portal-session', createPortalSession);

module.exports = router;