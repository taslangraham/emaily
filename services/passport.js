// Import passport.js
const Passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");

Passport.serializeUser((user, done) => {
  /**
   * done is a callback. we have to call it when we've
   * done something to push passports along.
   *
   * user.id is used to identify a user in subsequent request
   * this user.id is the _id on each record
   */
  done(null, user.id);
  // user.id is inserted into cookie
});

// converts cookie to user
Passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Tells passport to handle authentication.
 * new GoogleStrategy() is used to tell passport  that
 * this is the specific oauth service provider(Google in this case) to use
 */

Passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if this user already exists
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        /*if user already exist then return the existing user, 
          the 'null' tells passport that there were no errors
          */
        return done(null, existingUser);
      }
      // create new user if user does not already exist
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        googleId: profile.id
      }).save();
      done(null, user);
    }
  )
);
