const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.createCheckoutSession = async (req, res) => {
    const { price_id } = req.body;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price_id,
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
    const { customerId } = req.body;
    
    const returnUrl = `${process.env.CLIENT_URL}/private-area`;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    res.json({ url: portalSession.url })
}