const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.createCheckoutSession = async (req, res) => {
  const { priceId, customerId, subStatus } = req.body;

  const sessionOptions = {
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 5,
    },
    success_url: `${process.env.CLIENT_URL}/private-area/plan-details`,
    cancel_url: `${process.env.CLIENT_URL}/pricing`,
  }

  // check if the user was alredy subscribed
  if (subStatus === 'canceled') delete sessionOptions['subscription_data']['trial_period_days'];

  const session = await stripe.checkout.sessions.create(sessionOptions);

  res.json({ url: session.url });
}

exports.createPortalSession = async (req, res) => {
    const { customerId } = req.body;

    const returnUrl = `${process.env.CLIENT_URL}/private-area/plan-details`;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    res.json({ url: portalSession.url })
} 

exports.webhook = async (req, res) => {
  let event = req.body;

  const endpointSecret = process.env.ENDPOINT_SECRET;

  if (endpointSecret) {
    const sig = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  let subscription;

  switch (event.type) {
    case 'customer.subscription.created':
      subscription = event.data.object;
      updateSubscriptionStatus(subscription);
      break;
    case 'customer.subscription.updated':
      subscription = event.data.object;
      updateSubscriptionStatus(subscription);
      break;
    case 'customer.subscription.deleted':
      subscription = event.data.object;
      updateSubscriptionStatus(subscription);
      break;
    case 'customer.subscription.trial_will_end':
      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding();
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.send();
};

const updateSubscriptionStatus = (subscription) => {
  const { customer, status, plan } = subscription;

  db.query('UPDATE users SET status = ?, price_id = ? WHERE customer_id = ?', [status, plan.id, customer], (err, results) => {
    if (err) throw err; // da cambiare
  });
}