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
//const configDB = require('./config/database.js');
const ePort = process.env.PORT || 3011;
const PORT = 3011;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
const SERVER = http.createServer(app);
const SERVER_SOCKET = require('socket.io').listen(SERVER);
const fs = require('fs');
// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

//require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
/*app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/

// routes ======================================================================
require('./app/app.js')(app, passport,SERVER_SOCKET, fs); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
SERVER.listen(PORT);
//Display console the port used for application
console.log('The magic happens on port ' + PORT);
