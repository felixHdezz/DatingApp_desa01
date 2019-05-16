'use strict'

module.exports = function(_mongoose){
    var _setting = require('../config/database');
    var _debuger = require('../config/debugerPrint');

    _debuger.debugPrint(null, '[initandlisten] Configuration mongoBD...');
    _mongoose.Promise = global.Promise;

    //Genera conexion a mongoBD
    _mongoose.connect(_setting.mongoUrl, function (_error, resp) {
        if(_error){
            _debuger.debugPrint(_error, null);
        } else {
            _debuger.debugPrint(null, '[initandlisten] Conneted to mongoBD...');
        }
    });
};
