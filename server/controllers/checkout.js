const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckoutSession = async (req, res) => {
    const { id, customerId } = req.body;
    console.log(customerId);

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
            {
                price: id,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.CLIENT_URL}/subsription`,
        cancel_url: `${process.env.CLIENT_URL}/subsription`,
    });

    res.json({ url: session.url });
}

exports.createPortalSession = async (req, res) => {
    const { customerId } = req.body;

    const returnUrl = `${process.env.CLIENT_URL}/subscription`;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    res.json({ url: portalSession.url })
}