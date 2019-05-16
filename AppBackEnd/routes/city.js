'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var cityController = require('../controllers/CityController');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/city/:countryId', cityController.getCity);
_api.post('/city', cityController.create);

module.exports = _api;
