'use strict'

//Funcion para imprimir datos en la consola
function debugPrint(err, message) {
    //Obtiene la fecha actual
    var msg = getTime();
    /*if (callerId) {
        if (callerId.getString()) {
            msg += callerId.getString() + ': ';
        } else {
            msg += 'anonymousFunction: ';
        }
    }*/
    if (err) {
        msg += 'Error occurred. ' + err;
    } else {
        msg += message
    }
    console.log(msg);
}

function getTime() {
    var now = new Date();
    var _hours = now.getHours();
    var _minutes = now.getMinutes() < 10 ? '0'+ now.getMinutes() : now.getMinutes();
    var _seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    return '[' + _hours + ':' + _minutes + ':' + _seconds + '] ';
}


module.exports = {
    debugPrint: debugPrint
}
