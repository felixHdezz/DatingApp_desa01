'use strict'

//Carga modulo de mongoose, para generenar el esquema de modelo usuario
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Esquema de modelo de datos para la tabla de usuarios
var StateSchema = Schema({
    state: String,
    country: { type: Schema.ObjectId, ref: 'Country' },
    createdat: String
});

// Exporta el modelo
module.exports = mongoose.model('State', StateSchema);
