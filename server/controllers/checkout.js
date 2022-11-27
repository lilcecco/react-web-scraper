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
    allow_promotion_codes: true, // enter coupon field
    subscription_data: {
      trial_period_days: 5,
    },
    success_url: `${process.env.CLIENT_URL}/private-area/plan-details`,
    cancel_url: `${process.env.CLIENT_URL}/`,
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
    case 'invoice.paid':
      invoice = event.data.object;
      await renewSubscription(invoice);
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

const renewSubscription = async (invoice) => {
  const { customer, subscription } = invoice;

  const { plan } = await stripe.subscriptions.retrieve(subscription);

    // set processes_available
    switch (plan.id) {
      case 'price_1Lb36XJYxt4nzzwuhcwQIXrG': // (basic)
        processes_available = 30;
        break;
      case 'price_1Lb376JYxt4nzzwutijWpN3B': // (premium)
        processes_available = 300;
        break;
      default:
        processes_available = 'unlimited';
    }

    db.query("UPDATE users SET processes_available = ? WHERE customer_id = ?", [processes_available, customer], (err, results) => {
      if (err) throw err; // da cambiare
    });
}