const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    console.error('User Not Found');
                    return done(null, false, { message: 'User not found' });
                }

                // Checking if password is correct
                if (user.password != password) {
                    console.error('Invalid Password');
                    return done(null, false, { message: 'Invalid email or password' });
                }

                console.log('logged in');
                return done(null, user);
            })
            .catch(err => {
                console.error('Error in finding user --> Passport');
                return done(err);
            });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log('serialized');
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(user => {
            if (!user) {
                console.error('User not found during deserialization');
                return done(null, false);
            }
            console.log('deserialized');
            return done(null, user);
        })
        .catch(err => {
            console.error('Error in finding user --> Passport');
            return done(err);
        });
});


// check if user is authencticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect("/users/sign-in")
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;        
    }
    next();
}

module.exports = passport;
