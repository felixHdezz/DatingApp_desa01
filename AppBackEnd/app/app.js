'use strict'
module.exports = function (app, passport, io, fs) {
    //Carga los modulos necesarios
    var bodyParser = require('body-parser');

    // cargar archivos requeridos para las rutas de cada modulo
    var _auth_routes = require('../routes/authentication');
    var _sex_route = require('../routes/sex');
    var _user_route = require('../routes/user');
    var _authSimple_route = require('../routes/authSimple');
    var _photo_route = require('../routes/photo');
    var _country_route = require('../routes/country');
    var _state_route = require('../routes/state');
    var _city_route = require('../routes/city');

    //Para imprimir mensajes en consola
    var _debuger = require('../config/debugerPrint');

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());


    // Configurar el headers http
    _debuger.debugPrint(null, '[initandlisten] Config access control allow...');
    app.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        
        //Si esta todo correcto
        next();
    });

    // Carga la ruta base del API
    _debuger.debugPrint(null, '[initandlisten] Loading routers...');
    
    app.use('/api', _auth_routes);
    app.use('/api', _sex_route);
    app.use('/api', _user_route);
    app.use('/api', _authSimple_route);
    app.use('/api', _photo_route);
    app.use('/api', _country_route);
    app.use('/api', _state_route);
    app.use('/api', _city_route);
};
// Configuracion
