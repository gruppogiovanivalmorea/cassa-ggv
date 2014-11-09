var http = require('http');
var net = require('net');
 
var server = http.createServer(function (req, res) {
    var response;
    req.on('data', function(data){ 
        response = processRequest(JSON.parse(data)); 
    });
    req.on('end', function() { 
        res.writeHead(response.code, {'Content-Type': response.type});
        res.end(response.data);
    });
});

server.listen(1337, '127.0.0.1');
 
console.log('Server running at http://127.0.0.1:1337/');



var requestTypes = {
    "getPrinters"   : function(x) { return getPrinters();       },
    "print"         : function(x) { return print(x);            },
    "archive"       : function(x) { return archive(x);          },
    "print-archive" : function(x) { return print_archive(x);    }
}

function Response(code, type, data){
    this.code = code;
    this.type = type;
    this.data = data;
}

function unknownRequestException(req){
    return new Response(400,"text/html","Invalid request:\n"+req)
}

function getPrinters(){
    return new Response(
        200,
        "application/json",
        ['stampante rete 1', 'stampante usb']);
}

function print(req){
    var posCodes = generatePosCodesFromOrder(req.ordine);
    console.log(posCodes);
    var f;
    switch(req.stampante.tipo){
        case 'file':
            f = function(p) { printFile(req.stampante.nome, p); };
            break;
        case 'socket':
            f = function(p) { printSocket(req.stampante.nome, p); };
            break;
        default:
             return new Response(400,"text/html","Tipo stampante non valido: "+req.stampante.tipo);
            break;
    }
    
    // TODO: try catch
    try {
        posCodes.map(f);
        return new Response(200,"text/html","ok"); 
    }
    catch(err) {
        if(err instanceof ECONNRESET){
            return new Response(500,"text/html","ECONNRESET sulla socket "+req.stampante.nome);    
        }
        else if(err instanceof EHOSTUNREACH){
            return new Response(500,"text/html","Stampante di rete non raggiungibile: "+req.stampante.nome);   
        }
        else if(err instanceof EACCESS){
            return new Response(500,"text/html","Impossibile stampare sul file: "+req.stampante.nome);   
        }
        else{
            throw(err);
        }
    }
    
}

function archive(req){
    return new Response(200,"text/html",'archive ok');
}

function print_archive(req){
    return new Response(200,"text/html",'print-archive ok');
}

function processRequest(req){
    var f = requestTypes[req.nomeRichiesta] || unknownRequestException;
    return f(req);
}


function generatePosCodesFromOrder(ordine){
    var posCodes = [];
    
    for (productName in ordine.voci) {
        if(!ordine.voci.hasOwnProperty(productName)) continue;
        var item = ordine.voci[productName];
        item.nome = productName;
        if(!item.hasOwnProperty('splitPrint') || !item.splitPrint) {
            posCodes.push(generateSinglePos(item));
        }
        else{
            for(var i = 0; i < item.qta; i++){
                posCodes.push(generateSinglePos({
                    nome: item.nome,
                    qta: 1,
                    gruppo: item.gruppo
                }));   
            }
        }
    }
//    
//    $.each(ordine.voci, function(productName, item){
//        if(!item.hasOwnProperty('splitPrint') || !item.splitPrint) {
//            item.nome = productName;
//            posCodes.concat(generateSinglePos(item));
//        }
//        else{
//            for(var i = 0; i < item.qta; i++){
//                posCodes.concat(generateSinglePos({
//                    nome: item.nome,
//                    qta: 1,
//                    gruppo: item.gruppo
//                }));   
//            }
//        }
//    });
//    
    return posCodes;
}

// voce deve avere i campi: nome, gruppo, qta
function generateSinglePos(voce){
    var name = voce.nome;
    var group = voce.gruppo;
    var qta = voce.qta;
    
    var str = "";
    str += '\x1d\x21\x13';
    str += '  ValmoFestival Tridi';
    str += '\n\n\x1d\x21\x12';
    
    // center (23 è il numero di caratteri stampabili per riga, con dimensione carattere 12)
    str += new Array( parseInt( (23-group.length) / 2) ).join( ' ' );
    str += group;
    str += new Array( parseInt( (23-group.length) / 2) ).join( ' ' );
    
    str += '\n\n\x1d\x21\x11';
    str += '  '+qta+'  '+name;
    str += '\n\n\n\n\n\x1b\x6d';
    return str;
}

function printFile(fd,str){
    var fs = require('fs'); 
    var lp = fs.openSync(fd, 'w');
    fs.writeSync(lp, str);
    fs.close(lp);   
}

function printSocket(host,str){
    var net = require('net'); 
    var client = new net.Socket();
    client.connect(9100,host);
    client.write(str);
    client.end();
}
