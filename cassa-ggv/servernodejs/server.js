/**
    TODO 
    il server si blocca ricevendo stampa
    trovare il modo di rimandare indietro eccezioni 

*/

// Configurazioni
var APP_ROOT = '../www/';
var SERVER_PORT = 3000;

// Import miei
var printer = require("./printer");
var archiver = require("./archiver");


// Import esterni
var path = require('path');
var express = require('express');
var app = express();

// Definizione dell'oggetto Risposta
function Response(code, type, data){
    this.code = code;
    this.type = type;
    this.data = data;
}


// Definizione delle POST richieste gestite: [ stampa, archivia ]
// con associate le funzioni da usare per processarle
var POST_RequestTypes = {
    "stampa"    : function(x) { return printer.print(x);    },
    "archivia"  : function(x) { return archiver.archive(x); }
        //    "print-archive" : function(x) { return print_archive(x);    } // forse poi
}

// Funzione in caso di eccezione
function unknownRequestException(req){
    return new Response(400,"text/html","Invalid request:\n"+req)
}

// Log the requests
//app.use(express.logger('dev'));

// Settaggio della directory con il sito
app.use(express.static(path.join(__dirname, APP_ROOT)));

// Processazione delle richieste POST
for(var requestName in POST_RequestTypes){
    var requestFunction = POST_RequestTypes[requestName];
    console.log("bind req: "+requestName+" to function "+requestFunction);
    app.post("/"+requestName,function(req, res){
        var response;
        req.on('data', function(data){
            var parsed = JSON.parse(data);
            console.log(parsed);
            response = requestFunction(parsed);
            console.log('request: '+requestName);
            console.log(response);
        });
        req.on('end', function() {
            res.writeHead(response.code, {'Content-Type': response.type});
            res.end(response.data);
        });
    });
}



// Richieste non trattate
app.get('*', function(req, res){
    res.status(404).send("Not Found!");
});

// Avvio server
app.listen(SERVER_PORT);
console.log('Server avviato sulla porta '+SERVER_PORT);
