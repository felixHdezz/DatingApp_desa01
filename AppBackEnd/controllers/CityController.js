'use strict'

// carga los modulos necesarios
var fs = require('fs');
var path = require('path');
var debuger = require('../config/debugerPrint');

//Carga modulo para ejecutar executequerys
var _executeQuery = require('../database/query');

//Cargar el modelo de datos de Sex
var _city = require('../models/cuidad');

// Obtiene todos datos de la tabla Sex
function getCity(_req, _rep){
    //Ejecuta funcion para obtener todos los datos en una tabla
    _executeQuery.find(_city, null, function(_error, _resp){
        if (_error) {
            _rep.status(200).send({message:'Error al obtener los registros'});
        } else {
            _rep.status(200).send({sex: _resp});
        }
    });
}

function create(_req, _rep) {
    //Obtiene los parametros del header
    var _params = _req.body;

    //Ejecuta la funcion para insertar
    _executeQuery.insertOne(_city, _params, function (_error, _resp) {
        if (_error) {
            _rep.status(404).send({message:'Error al insertar en la base de datos'});
        } else {
            _rep.status(200).send({sex: _params});
        }
    });
}

//Exporta modulos
module.exports = {
    getCity: getCity,
    create: create
};
