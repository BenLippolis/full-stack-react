const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// You can pull models out of mongoose with a single argument (collection name)
const User = mongoose.model('users');

// Serialize user will generate token specific to user 
// Pass user as first argument 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user takes a function, first argument is cookie token 
// In our case that is the users id
passport.deserializeUser((id, done ) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

// Creates a new instance of passport google strategy
// Need to pass keys & specify redirect route 
// Tell google strategy to trust Heroku proxy server 
passport.use(
    new GoogleStrategy(
      {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
      }, 
      // Passport callback function 
      // Save user model instance to DB 
      // .then is a promise callback to help handle asynchronous call 
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
              // we already have a record with the given ID 
              // done takes an error argument, and user argument 
              done(null, existingUser);
            } else {
              // user does not exist yet, make a new records 
              new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));
            }
          });         
      }
    )
  );

