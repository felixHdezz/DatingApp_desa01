'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var countryController = require('../controllers/CountryController');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/country/:countryId', countryController.getCountry);
_api.post('/country', countryController.create);

module.exports = _api;
