// config/database.js
module.exports = {
    // URL para la conexion a mongoDB
    mongoUrl  : 'mongodb://127.0.0.1:27017/DattingAPP',

    // Credenciales para la conexion a la base de datos de sql server
    configSQL : {
        user: ''
        ,password: ''
        ,server: 'DESKTOP-SSAISFI\\MSSQLSERVER01'
        ,database: 'DattingAPP'
        ,port: 1433
    }
    // Credenciales para la conexion a la base de datos MySQL
};
