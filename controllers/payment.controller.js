const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.getClientSecret = async (req, res) => {
    const service = req.body;
    const { price } = service;
    const amount = Math.round(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
};
