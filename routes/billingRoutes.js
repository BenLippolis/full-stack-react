const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // Route handler
    // requireLogin function will execute whenever a req hits this route  
    app.post('/api/stripe', requireLogin, async (req, res) => {
        
        // Express does not automatically parse post requests, use body-parser
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Five Emaily Credits',
            source: req.body.id,
        });

        // req.user Setup by passport to return current user
        // Add user credits
        req.user.credits += 5;
        const user = await req.user.save(); 

        res.send(user);
    });
};
