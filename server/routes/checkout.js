const express = require('express');
const { createCheckoutSession, createPortalSession, webhook } = require('../controllers/checkout');

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
// router.post('/create-portal-session', createPortalSession);

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

module.exports = router;