'use strict'

// carga los modulos necesarios
var fs = require('fs');
var path = require('path');
var _debuger = require('../config/debugerPrint');

//Carga modulo para ejecutar executequerys
var _executeQuery = require('../database/query');

//Cargar el modelo de datos de Sex
var _user = require('../models/user');
var _photo = require('../models/photo');

// Obtiene todos datos de la tabla Sex
function getUserById(_req, _rep){
    //Ejecuta funcion para obtener todos los datos en una tabla
    _executeQuery.find(_user, null, function(_error, _resp){
        if (_error) {
            _rep.status(200).send({message:'Error al obtener los registros'});
        } else {
            _rep.status(200).send({sex: _resp});
        }
    });
}

//Obiente los usuarios por filtros personalizados
function getUserByFilters(_req, _resp){
    var _filters = _req.body;

    //Genera JSON para loss filtros
    var _params = { };
 
    //Existe filtros, guarda los datos al JSON
    if(_filters){
        _params.sex = _filters.sex;
        _params.city = _filters.city;
        _params.birthday = { '$gte': _filters.ageI, '$lt':  _filters.ageF};
    }
    console.log('Parametros :', _params);
    //Busca datos de usuario con los filtros
    _executeQuery.findOne(_user, _params, 'name', true, 'sex', function(_error, _collection){
        if(_error){
            _debuger.debugPrint(_error, null);
        } else {
            if(_collection.length > 0){
                _resp.status(200).send({users: _collection});
            } else {
                _debuger.debugPrint(null, 'No hay resgitros de datos en la tabla [Usuario]...');
                _resp.status(200).send({message: 'No hay registros de usuarios'});
            }
        }
    });    
}

function createUser(_req, _rep) {
    //Obtiene los parametros del header
    var _params = _req.body;
    _debuger.debugPrint(null, _params);
    
    //Ejecuta la funcion para insertar
    _executeQuery.insertOne(_user, _params, function (_error, _resp) {
        if (_error) {
            _rep.status(404).send({message:'Error al insertar en la base de datos'});
        } else {
            _rep.status(200).send({user: _params});
        }
    });
}


module.exports = {
    getUserById: getUserById,
    getUserByFilter: getUserByFilters,
    create: createUser
};
