'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var authSimpleController = require('../controllers/AuthSimpleController');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/authsimple/:userId', authSimpleController.find);
_api.post('/authsimple', authSimpleController.create);

module.exports = _api;
