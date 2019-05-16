var mongoose = require('mongoose');
var User = mongoose.model('User');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(_passport){
    _passport.serealizeUser(function(_user, _done){
        _done(null, _user);
    });
    
};