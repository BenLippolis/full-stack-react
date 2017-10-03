const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

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

