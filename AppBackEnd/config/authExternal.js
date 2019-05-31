// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'googleAuth' : {
        'clientID'         : '634127625828-mc8ttvqfu2m3bbc8h0bu9f40a9f4vi0k.apps.googleusercontent.com',
        'clientSecret'     : 'yJaMhzkyr1mMQW_cT_-oCFS4',
        'callbackURL'      : 'http://localhost:3011/api/auth/google/callback'
    },
    'facebookAuth': {
        'clientID'         : 'clientID',
        'clientSecret'     : 'clientSecret',
        'callbackURL'      : 'urlcallback'
    }
};
