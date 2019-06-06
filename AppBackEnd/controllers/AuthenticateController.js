'use strict'

//Carga paquetes necesarios
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var debuger = require('../config/debugerPrint');

// Carga el archivo para el servico de JWT
var jwt = require('../services/jwt');

//servicios de auth
const Authentication = require('../auth/auth');

//Carga modulo para ejecutar executequerys
var _execQuery = require('../database/query');

//Carga los modelos necesarios 
var _user = require('../models/user');
var _authSimple = require('../models/authSimple');
var _tokenmodel = require('../models/token');

var _auth = new Authentication();

function authentication(_req, _res) {
	//Obtiene los parametros enviados desde el front
	var _params = _req.body;

	//Obtiene los parametros username y passwords
	var _username = _params.username; 
	var _password = _params.password;

	//Genera Json para buscar el usuario en la base de datos
	var _prmfind = { email: _username.toLowerCase() };

	//Sí estan definidos los parametros
	if (_password && _username) {
		_execQuery.findOne(_user, _prmfind, '', null, null, function(_error, _dataU){
			if(_error){
				_res.status(404).send({ message: 'El usuario no existe a la base de datos' });
			}else{
				if(_dataU){
					//Obtiene el userId del usuario a logear
					var _userId = _dataU[0]._id;
					debuger.debugPrint(null, 'UserID ['+ _userId + ']');

					// valida si el usario se va a loguear por auth simple
					var _prmfAuth = { user: _userId };
					_execQuery.findOne(_authSimple, _prmfAuth, null, null, null, function(_error, _dataA){
						if(_error){
							_res.status(404).send({ message: 'El usaurio no ha podido loguearse' });
						}else{
							if(_dataA.length > 0){
								comparePassword(_password, _dataA[0].password, _dataU, _res);
							}
						}
					});
				}
			}
		});
	} else {
		//_res.status(200).send({ message: 'Introduce el email y/o contraseña' });
		var _type = _params._type;
		if(_type){
			const login = _req.body;
			_auth.authenticate(login).then(credentials => {
				//userStore.push(credentials.user);
				//res.json(credentials).end();}
				console.log(credentials);
				_res.status(404).send({message: 'exito' });  
			});
		}
	}
}

function comparePassword(_parm1, _param2, _user, _res){
	bcrypt.compare(_parm1, _param2, function (_error, _check) {
		if (_check) {
			//devolver los datos del usario logueado
			var _rJSON = { user : _user[0], token: '' };
			//Genera el token para el usuario, y se guarda en la base de datoss
			var _jwt = jwt.createToken(_user[0]);
			if(_jwt){
				//Se guarda en la base de datos
				var _prmToken = {
					user: _user[0]._id, 
					token: _jwt._token,
					ait: _jwt._payload.ait,
					exp: _jwt._payload.exp,
					isRefresh:0,
					isDelete: 0,
					createdat: new Date(),
					lastmodified: new Date(),
					deletedat: null
				};
				//Valida s ya existe en la base de datos
				var _prmfind = { user: _user[0]._id};
				_execQuery.findOne(_tokenmodel, _prmfind, null, null, null, function(_e, _d){
					if(_e){
						debuger.debugPrint(_e, null);
					}else{
						if(_d.length == 0){
							_execQuery.insertOne(_tokenmodel, _prmToken, _user[0]._id, function(_error, _resp){
								if(_error){
									debuger.debugPrint(_error, null);
								}else{
									debuger.debugPrint(null, 'Se agrego nuevo registro a la tabla [Token]..');
								}
							});	
						}else{
							debuger.debugPrint(null, 'Ya existe un registro con el mismo ID..');
						}
					}
				});
				_rJSON.token = _jwt._token;
				_res.status(200).send(_rJSON);
			}else {
				debuger.debugPrint(null, 'Error al generar el token..');
				_res.status(404).send({message: 'Error al generar el token' });
			}
		} else {
			_res.status(404).send({ message: 'El usaurio no ha podido loguearse' });
		}
	});
}

//Exporta las funciones
module.exports = {
		authentication
};
