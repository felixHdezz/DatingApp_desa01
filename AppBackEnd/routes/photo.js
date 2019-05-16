'use strict'
//Carga los modulos necesarios
var express = require('express');
var multipart = require('connect-multiparty');
//Carga el controlador
var photoController = require('../controllers/PhotoController');

//Carga el archivo middleware, para verificar la autentificacion por token
var _md_auth = require('../middleware/authentication');

// Manejo de rutas en NodeJS
var _api = express.Router();

_api.get('/photo/:userId', _md_auth.ensureAuth, photoController.getPhotoById);
_api.post('/photo', photoController.create);

module.exports = _api;
