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
      //clientID: process.env.GOOGLE_CLIENT_ID,
      //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
      }, 
      // Passport callback function 
      // Save user model instance to DB 
      // Example of async await syntax 
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          // we already have a record with the given ID 
          // done takes an error argument, and user argument 
          return done(null, existingUser);
        } 
        // user does not exist yet, make a new records 
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
        }      
    )
  );

