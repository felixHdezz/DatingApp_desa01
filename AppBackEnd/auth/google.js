// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('../config/authExternal');
var User = require('../models/user');

module.exports = function (passport) {
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, token, refreshToken, profile, done) {
        
        var mail = profile._json.emails[0].value;
        var domain = profile._json.domain;

        process.nextTick(function () {
            // check if the user is already logged in
            if (!req.user) {
                User.findOne({
                    'google.id': profile.id

                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        user.google.pic = (profile._json.image.url).slice(0, -6);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            return done(null, user);
                        });

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first em
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        newUser.google.pic = (profile._json.image.url).slice(0, -6);
                        newUser.save(function (err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                user.google.pic = (profile._json.image.url).slice(0, -6);
                user.save(function (err) {
                    if (err)
                        return done(err);

                    return done(null, user);
                });
            }
        });
    }));
};