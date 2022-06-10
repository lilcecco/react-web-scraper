const express = require('express');
const { createCheckoutSession, createPortalSession, createSubscription, webhook } = require('../controllers/checkout');

const router = express.Router();

router.post('/webhook', webhook);

router.post('/create-checkout-session', createCheckoutSession);

// router.post('/create-portal-session', createPortalSession);

// router.post('/create-subscription', createSubscription);

module.exports = router;