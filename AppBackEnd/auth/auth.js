'use strict'

// Carga los paquetes necesarios
var _debuger = require('../config/debugerPrint');

const jwt = require('../services/jwt');
const googleAuth = require('./passport-google');
const facebookAuth = require('./passport-facebook');

const verifyTipeLogin = login => {
    const _type = login._type;

    //Verifica  tipo de autentificacion
    switch(_type){
        case 'google':
            return googleAuth.getGoogleUser(login.code).then(response => {
                const content = {
                    token: createToken(response),
                    user: response
                };
                return content;
            }).catch(_error => {
                _debuger.debugPrint(_error, null);
                throw new Error(e);
            });
        break;

        case 'facebook':
        break;
    }
};

// Define la clase de autentificaion
class Authentication {

    // Function filter
    /*filter() {
        return (req, res, next) => {
            try {
                let shouldProtect = getProtectedResource(req, this.config.routes);
    
                if (shouldProtect) {
                    let principal = checkToken(req);
                res.locals.principal = principal;
                }
                next();
            } catch (e) {
                console.log('unouthorized', e);
                res.status(401).json({ error: 'not_authorized' }).end();
            }
        };
    }*/
    
    //Middleware de autentificacion
    authenticate(login) {
        return verifyTipeLogin(login).then(principal => {
            return principal;
        });
    }
  }
  
  module.exports = Authentication;
  