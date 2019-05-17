'use strict'

//carga todos modulos que se necesitan
var jwt = require('jwt-simple');
var moment  = require('moment');
var _execQuery = require('../database/query');
var debuger = require('../config/debugerPrint');

//Carga los modelos necesarios
var _token_model = require('../models/token');

//Clave generica secreta
var _secret = 'my_voice_is_my_password';

exports.ensureAuth = function(_req, _res, next){
    if(!_req.headers.authorization){
        _res.status(403).send({message:'Error authentication user'});
    } else {
        var _token = _req.headers.authorization.replace(/['"]+/g,'');
        try{
            var _payload = jwt.decode(_token, _secret);
            //Obtiene los datos de usuario en la base de datos para validar si el token ha expirado
            var _prmFind = { user: _payload.sub };

            _execQuery.findOne(_token_model, _prmFind, null, null, null, function(_error, _data){
                if(_error){
                    debuger.debugPrint(_error, null);
                }else{
                    if(_data.length > 0){
                        //Obtiene los datos de usuario
                        var _dToken = _data[0];
                        
                        //Valida si el token ya esta expirado
                        if(_dToken.exp <= moment().unix()){
                            return _res.status(401).send({message:'Token expired'});
                        }
                    }
                }
            });
        }catch(ex){
            debuger.debugPrint(ex, null);
            return _res.status(404).send({message:'Token is not valided'});
        }
    }
    _res.user = _payload;

    //Next continue application
    next();
};