'use strict'

var express = require('express');
var authenticationController = require('../controllers/AuthenticationController');
var multipart = require('connect-multiparty');

// Manejo de rutas en NodeJS
var api = express.Router();

api.get('/authentication', authenticationController.authentication);

module.exports = api;
