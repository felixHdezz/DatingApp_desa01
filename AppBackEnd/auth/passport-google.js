'use strict'

//Carga los modulos necesarios
var debuger = require('../config/debugerPrint');
var setting = require('../config/settings');
const GOOGLE_CLIENT_ID = setting.GOOGLE_CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');

var client = new OAuth2Client(GOOGLE_CLIENT_ID, 'yJaMhzkyr1mMQW_cT_-oCFS4', 'http://localhost:3011/auth/google/callback');

module.exports.getGoogleUser = code => {
    debuger.debugPrint(null, code);
    return client
    .verifyIdToken('google', GOOGLE_CLIENT_ID)
    .then(login => {
        var payload = login.getPayload();
        var audience = payload.aud;
        if (audience !== GOOGLE_CLIENT_ID) {
            throw new Error(
            'error while authenticating google user: audience mismatch: wanted [' +
                GOOGLE_CLIENT_ID +
                '] but was [' +
                audience +
                ']'
            );
        }
        return {
            name: payload['name'],
            pic: payload['picture'],
            id: payload['sub'],
            email_verified: payload['email_verified'],
            email: payload['email']
        };
    })
    .then(user => {
        console.log('Aqui esta el error');
        return user;
    })
    .catch(err => {
        console.log('Aqui esta el error 01');
        throw new Error(
            'error while authenticating google user: ' + JSON.stringify(err)
        );
    });
};
