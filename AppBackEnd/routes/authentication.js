'use strict'

var express = require('express');

var authenticationController = require('../controllers/AuthenticateController');

var multipart = require('connect-multiparty');

// Manejo de rutas en NodeJS
var api = express.Router();

module.exports = function(passport){

    // Define las rutas para el controlador de autentificacion
    api.post('/auth/v1/token', authenticationController.authentication);

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================
    // google ---------------------------------
    // send to google to do the authentication
    api.get('/auth/google', passport.authenticate('google', {
        hd: 'email',
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    api.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res)=> {
            var _data = req.user;
            res.status(200).send({ _data });
        }
    );

    return api;
};
