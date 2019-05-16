'use strict'

//Carga los modulos necesarios
var _debuger = require('../config/debugerPrint');

//funcion global para realizar consultas a la base de datos
function  Find(_model, _callback) {
    var _rData = [];
    if(_model){
        //Obtiene todos los registros de la tabla
        var _cursor = _model.find({});
        //Verifica si tiene datos
        _cursor.count( function(_error, _count) {
            if(_error){
                _debuger.debugPrint(_error, null);
                _callback(_error, null);
            } else {
                if(_count === 0){
                    _callback(null, _rData);
                } else {
                    //Obtiene el siguiente lista de datos
                    _cursor.find(function(_error, _collections) {
                        _rData = _collections;
                        if(_error){
                            _debuger.debugPrint(_error, null);
                            _callback(_error, null);
                        } else {
                            _callback(null, _rData);
                        }
                    });
                }
            }
        });
    }
}

function  FindOne(_model, _params, _sort, _isPopulate, _path, _callback) {
    var _rData = [];
    if(_model){
        //Verirfica si existe parametros
        if (_params){
            //Obtiene todos los registros de la tabla
            var _cursor = _model.find(_params);
            //Verifica si tiene datos
            _cursor.count( function(_error, _count) {
                if(_error){
                    _debuger.debugPrint(_error, null);
                    _callback(_error, null);
                } else {
                    if(_count === 0){
                        _debuger.debugPrint(null, 'Registros: '+ _count);
                        _callback(null, _rData);
                    } else {
                        if(_isPopulate && _path){
                            _cursor.populate({ path: _path }).exec((_err, _collection) => {
                                _rData = _collection;
                                _cursor.find(function(_error, _collections) {
                                    _rData = _collections;
                                    if(_error){
                                        _debuger.debugPrint(_error, null);
                                        _callback(_error, null);
                                    } else {
                                        _debuger.debugPrint(_error, 'Numero de registros obtenidos ['+ _rData.length +']');
                                        _callback(null, _rData);
                                    }
                                });
                            });
                        } else {
                            //Obtiene el siguiente lista de datos
                            _cursor.find(function(_error, _collections) {
                                _rData = _collections;
                                if(_error){
                                    _debuger.debugPrint(_error, null);
                                    _callback(_error, null);
                                } else {
                                    _debuger.debugPrint(_error, 'Numero de registros obtenidos ['+ _rData.length +']');
                                    _callback(null, _rData);
                                }
                            });
                        }
                    }
                }
            });
        }
    }
}

function  InsertOne(_model, _params, callback) {
    if(_model){
        _model.insertMany([_params], function (_error, _resp) {
            if(_error){
                _debuger.debugPrint(_error, null);
                callback(_error, null);
            } else {
                _debuger.debugPrint(null, 'Inserted new data to database...');
                callback(null, true);
            }
        });
    }
}

function  UpdateOne(_model, _params, callback) {

}

function  UpdateMany(_model, _params, callback) {

}

function  DeleteOne(_model, _id, _params, callback) {

}

//Exporta los modulos creados, para utilizar desde otro lugar
module.exports = {
    find: Find,
    findOne: FindOne,
    insertOne: InsertOne,
    updateOn: UpdateOne,
    deleteOne: DeleteOne
};
