'use strict'

//Carga modulo de mongoose, para generenar el esquema de modelo usuario
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Esquema de modelo de datos para la tabla de usuarios
var AuthSimpleSchema = Schema({
			userId: Number,
			username: String,
			password: String,
			isDelete: Number,
			createdat: Date,
			user: { type: Schema.ObjectId, ref: 'User' }
});

// Exporta el modelo
module.exports = mongoose.model('AuthSimple', AuthSimpleSchema);
