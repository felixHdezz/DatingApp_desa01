'use strict'

// Carga los modulos necesarios
var _express = require('express');
var multipart = require('connect-multiparty');

// Carga el contolador de usuario
var userController = require('../controllers/UserController');

//Inicializa el server para manejo de rutas
var _api = _express.Router();

_api.get('/user/:id', userController.getUserById);
_api.post('/user/filter', userController.getUserByFilter);
_api.post('/user', userController.create);

//Exporta el server de express
module.exports = _api;
