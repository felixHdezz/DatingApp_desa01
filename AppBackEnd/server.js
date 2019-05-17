// set up ======================================================================
// get all the tools we need
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var debuger = require('./config/debugerPrint');
const debug = true;
//const configDB = require('./config/database.js');

//asignacion del puerto del servicor
const ePort = process.env.PORT || 3011;

//Carga la instancia del servidor
const app = express();

//Configuracion para que pueda acceder a la caperta "public"
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));

// Crear el servidor de aplicaciones (express)
const SERVER = http.createServer(app);

const SERVER_SOCKET = require('socket.io').listen(SERVER);
const fs = require('fs');

// configuration database===============================================================
require('./database/connection-mongoDB.js')(mongoose);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// set up ejs for templating
app.set('view engine', 'ejs');

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
// routes ======================================================================
// load our routes and pass in our app and fully configured passport
// routes ======================================================================
// load our routes and pass in our app and fully configured passport
// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/app.js')(app, passport,SERVER_SOCKET, fs);

// launch server ======================================================================
SERVER.listen(ePort);

//Display console the port used for application
debuger.debugPrint(null, '[initandlisten] Waiting for connections on port' + ePort + '...');
