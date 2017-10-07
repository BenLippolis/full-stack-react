// Root file 
// Require Express 
const express = require('express');
const mongoose = require('mongoose');
// Gives us access to cookies 
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


// mongoose.connect(process.env.MONGO_URI, {
    mongoose.connect(keys.mongoURI, {
    useMongoClient: true
    /* other options */
  });


// Configure app with port & routing 
const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Tell app to use cookies 
app.use(
    cookieSession({
        //Configuration object 
        // maxAge: how long cookie can exist inside the browser (as miliseconds)
        // keys: key to encrypt cookie 
        maxAge: 30 * 24 * 60 * 1000,
        //keys: [process.env.COOKIE_KEY]
        keys: [keys.cookieKey]
    })
);

// Tell passport to use cookies 
app.use(passport.initialize());
app.use(passport.session());

// Require returns a function and app is immediatley passed in 
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Dynamic Port Binding 
const PORT = process.env.PORT || 5000
app.listen(PORT);