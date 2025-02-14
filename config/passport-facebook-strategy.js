const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
const FACEBOOK_APP_ID = env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = env.FACEBOOK_APP_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/users/auth/facebook/callback",
    profileFields: ['name', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    // Find a user by email
    let user = await User.findOne({ email: profile.emails[0].value }).exec();
        
    if (user) {
        // If found, set the user as req.user
        return cb(null, user);
    } else {
        // If not found, create a new user
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        });
        return cb(null, user);
    }
  }
));


module.exports = passport;