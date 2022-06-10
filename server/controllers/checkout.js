const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// exports.createSubscription = async (req, res) => {
//     const { id, customerId } = req.body;

//     const d = new Date();
//     d.setDate(d.getDate() + 5);
//     const trialEnd = parseInt(d.getTime() / 1000);
//     console.log(trialEnd);

//     const subscription = await stripe.subscriptions.create({
//         customer: customerId,
//         items: [{ price: id }],
//         trial_end: trialEnd,
//     });
//     console.log(subscription);
//     res.json({ subscription });
// }

exports.createCheckoutSession = async (req, res) => {
    const { id: priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL}/subsription`,
        cancel_url: `${process.env.CLIENT_URL}/subsription`,
    });

    res.json({ url: session.url });
}

// exports.createPortalSession = async (req, res) => {
//     const { customerId } = req.body;

//     const returnUrl = `${process.env.CLIENT_URL}/subscription`;

//     const portalSession = await stripe.billingPortal.sessions.create({
//         customer: customerId,
//         return_url: returnUrl,
//     });

//     res.json({ url: portalSession.url })
// } 

exports.webhook = async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = 'whsec_69a9c5d1bbe228daa1d2c3c254ee04e5c77474341213e23d0e237f36de183dc1'
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case 'checkout.session.completed':
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        case 'invoice.paid':
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            break;
        case 'invoice.payment_failed':
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            break;
        default:
        // Unhandled event type
    }

    res.sendStatus(200);
};