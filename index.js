// Root file 

// Require Express 
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// Configure app with port & routing 
const app = express();

// Creates a new instance of passport google strategy
// Need to pass keys & specify redirect route 
passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refreah token', refreshToken);
        console.log('profile', profile);
    }
  )
);

// Specify route for entering passport auth flow 
// Google Strategy has an intermal identifier of 'google' which we call below
app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
);

// Route to handle google redirect + code
// Passport will detect the code inside the URL 
app.get('/auth/google/callback', passport.authenticate('google'));


// Dynamic Port Binding 
const PORT = process.env.PORT || 5000
app.listen(PORT);