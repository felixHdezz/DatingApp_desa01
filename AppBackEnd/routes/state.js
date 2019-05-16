'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var stateController = require('../controllers/StateController');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/state/:countryId', stateController.getState);
_api.post('/state', stateController.create);

module.exports = _api;
