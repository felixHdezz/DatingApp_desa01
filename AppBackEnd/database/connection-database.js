'use strict'
// carga modulos necesarios
var _sql = require("mssql");
var _configDB = require('./database');

var _debuger = require('../config/debugerPrint');

function _executeQuery(_query, _callback){
    _sql.connect(_configDB.configSQL, function (_error) {
        // Verifica que no exista algun error en la conexion en la base de datos
        if (_error) {
            _debuger.debugPrint("Error code: E0001 \n Validation code: V0001 \n Description: Error trying to connect with the database.", null)
            _debuger.debugPrint(_error, null);
        }else{
            // create Request object
            var _request = new sql.Request();
            
            // query to the database and get the records
            _request.query(_query, function (err, _recordset) {
                
                if (err) _debuger.debugPrint(_error, null);

                // send records as a response
                _debuger.debugPrint(null, 'Ejecución del query existosa..');
                _callback(null, _recordset);
            });
        }
    });
}

function _prepareData(_data){

}

// Exporta las funciones creadas
module.exports = {
    ExecuteQuery: _executeQuery
};