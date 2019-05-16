'use strict'

//Carga los modulos necesarios
var jwt = require('jwt-simple');
var moment = require('moment');

//Clave generica secreta
var secret = 'my_voice_is_my_password';

//Funcion que genera el token
function createToken(_user) {
    var _rJson = { _payload: null, _token: null};

    var payload = {
        sub: _user._id,
        name: _user.name,
        lastname: _user.lastname,
        email: _user.email,
        ait: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    
    _rJson._payload = payload;
    _rJson._token = jwt.encode(payload, secret);
    return _rJson;
}

function refreshToken(_user){
    
}

module.exports = {
    createToken: createToken,
    refreshToken:refreshToken
};
