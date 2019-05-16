'use strict'

// carga los modulos necesarios
var fs = require('fs');
var path = require('path');
var debuger = require('../config/debugerPrint');

//Carga modulo para ejecutar executequerys
var _executeQuery = require('../database/query');

//Cargar el modelo de datos de Sex
var _Photo = require('../models/photo');

// Obtiene todos datos de la tabla Sex
function getPhotoById(_req, _rep){
    var _userId = _req.params.userId;
    var _params = { user: _userId };

    //Ejecuta funcion para obtener todos los datos en una tabla
    _executeQuery.findOne(_Photo, _params, 'createdat', true, 'user', function(_error, _resp){
        if (_error) {
            _rep.status(200).send({message:'Error al obtener los registros, [ERROR]: ' + _error});
        } else {
            _rep.status(200).send({photos: _resp});
        }
    });
}

function create(_req, _rep) {
    //Obtiene los parametros del header
    var _params = _req.body;

    //Ejecuta la funcion para insertar
    _executeQuery.insertOne(_Photo, _params, function (_error, _resp) {
        if (_error) {
            _rep.status(404).send({message:'Error al insertar en la base de datos'});
        } else {
            _rep.status(200).send({sex: _params});
        }
    });
}


module.exports = {
    getPhotoById: getPhotoById,
    create: create
};
