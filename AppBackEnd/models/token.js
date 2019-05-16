'use strict'

//Carga modulo de mongoose, para generenar el esquema de modelo usuario
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Esquema de modelo de datos para la tabla de usuarios
var TokenSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    token: String,
    ait: Number,
    exp: Number,
    isRefresh:Number,
    isDelete: Number,
    createdat: Date,
    lastmodified:Date,
    deletedat: Date
});

// Exporta el modelo
module.exports = mongoose.model('Token', TokenSchema);
