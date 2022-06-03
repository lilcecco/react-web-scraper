const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { id } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.CLIENT_URL}/processes-history`,
    cancel_url: `${process.env.CLIENT_URL}/pricing`,
  });

  res.json({ url: session.url });
}