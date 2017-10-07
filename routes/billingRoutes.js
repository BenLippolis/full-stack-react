const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // Route handles 
    app.post('/api/stripe', async (req, res) => {
        // Express does not automatically parse post requests, use body-parser
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Five Emaily Credits',
            source: req.body.id,
        });
        console.log(charge);
    });
};