const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');



// tell passport to use a new strategy to use google login
passport.use(new googleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // Find a user by email
        let user = await User.findOne({ email: profile.emails[0].value }).exec();
        
        if (user) {
            // If found, set the user as req.user
            return done(null, user);
        } else {
            // If not found, create a new user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, user);
        }
    } catch (err) {
        console.error("Error in Google strategy:", err);
        return done(err, null);
    }
}));


module.exports = passport;