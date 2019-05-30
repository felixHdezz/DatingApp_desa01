'use strict'

var express = require('express');

var authenticationController = require('../controllers/AuthenticateController');

var multipart = require('connect-multiparty');

// Manejo de rutas en NodeJS
var api = express.Router();

// Define las rutas para el controlador de autentificacion
api.post('/auth/v1/token', authenticationController.authentication);

module.exports = api;
