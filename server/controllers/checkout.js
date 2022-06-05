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
        success_url: `${process.env.CLIENT_URL}/subsription?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/subsription?cancel=true`,
    });

    res.json({ url: session.url });
}

exports.createPortalSession = async (req, res) => {
    const { sessionId } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    const returnUrl = `${process.env.CLIENT_URL}/private-area`;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });

    res.json({ url: portalSession.url })
}