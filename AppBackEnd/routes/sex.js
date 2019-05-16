'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var sexController = require('../controllers/SexController');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/sex', sexController.GetAllSex);
_api.post('/sex', sexController.create);

module.exports = _api;
