// Root file 

// Require Express 
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config.keys');

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
    accessToken => {
        console.log(accessToken);
    }
  )
);

// Dynamic Port Binding 
const PORT = process.env.PORT || 5000
app.listen(PORT);