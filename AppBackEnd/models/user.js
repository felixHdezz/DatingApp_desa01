'use strict'

//Carga modulo de mongoose, para generenar el esquema de modelo usuario
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Esquema de modelo de datos para la tabla de usuarios
var UserSchema = Schema({
	userId: Number,
	name: String,
	lastname: String,
	description: String,
	sex: { type: Schema.ObjectId, ref: 'Sex' },
	birthday: Date,
	email: String,
	position: String,
	company: String,
	school: String,
	livingin: String,
	city: { type: Schema.ObjectId, ref: 'City'},
	lat1: String,
	lat2: String,
	profilePic: String,
	isDelete: Number,
	createdat: Date,
	lastmodified:Date,
	deletedat: Date,
	facebook: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	},
	google: {
		id: String,
		token: String,
		username: String,
		displayName: String,
		lastStatus: String
	}
});

// Exporta el modelo
module.exports = mongoose.model('User', UserSchema);
