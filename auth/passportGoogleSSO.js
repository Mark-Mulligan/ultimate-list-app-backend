const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, acessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleId: profile.id,
      };

      User.findOrCreate(defaultUser, (err, foundUser) => {
        if (err) {
          console.log(err);
          return cb(err, null);
        } else {
          console.log(foundUser);
          return cb(null, foundUser);
        }
      });
    },
  ),
);
