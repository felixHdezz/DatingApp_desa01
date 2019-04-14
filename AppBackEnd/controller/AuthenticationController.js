'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function authentication(req, res) {
	//Obtiene los parametros enviados desde el front	
	var _params = req.body;

	var _email = _params.email;
	var _password = _params.password;

	if (_password && _email) {
		User.findOne({ email: _email.toLowerCase() }, function (_err, user) {
			if (_err) {
				res.status(500).send({ message: 'Error en la peticion al servidor ' });
			} else {
				if (!user) {
					res.status(404).send({ message: 'El usuario no existe a la base de datos' });
				} else {
					bcrypt.compare(_password, user.password, function (_err, _check) {
						if (_check) {
							//devolver los datos del usario logueado
							if (_params.gethash) {
								// devolvera un ojeto
								res.status(200).send({
									token: jwt.createToken(user)
								});
							} else {
								res.status(200).send({ user })
							}
						} else {
							res.status(404).send({ message: 'El usaurio no ha podido loguearse' });
						}
					});
				}
			}
		});
	} else {
		res.status(200).send({ message: 'Introduce el email y/o contraseña' });
	}
}

//Exporta las funciones
module.exports = {
	authentication
};