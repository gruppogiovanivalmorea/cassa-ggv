module.exports = {
  print: function (req) { _print(req); }
};


function _print(req){
    try{
        var posCodes = generatePosCodesFromOrder(req.ordine);
    }
    catch(err){
        return unknownRequestException([req,err]);
    }
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
        if(err.code == 'ECONNRESET'){
            return new Response(500,"text/html","ECONNRESET sulla socket "+req.stampante.nome);    
        }
        else if(err.code == 'EHOSTUNREACH'){
            return new Response(500,"text/html","Stampante di rete non raggiungibile: "+req.stampante.nome);   
        }
        else if(err.code == 'EACCES'){
            return new Response(500,"text/html","Impossibile stampare sul file: "+req.stampante.nome);   
        }
        else{
            throw(err);
        }
    }
    
}

function generatePosCodesFromOrder(ordine){
    var posCodes = [];
    
    for (productName in ordine.voci) {
        if(!ordine.voci.hasOwnProperty(productName)) continue;
        var item = ordine.voci[productName];
        item.nome = productName;
        if(parseInt(item.qta) == 0) continue;
        if(!item.hasOwnProperty('dividiStampa') || !item.dividiStampa) {
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
    str += '  '+qta+'x '+name;
    str += '\n\n\n\n\n\n\n\x1b\x6d';
    return str;
}

function printFile(fd,str){
    //var sync = require('synchronize');
    
    console.log('printing..');
    var fs = require('fs'); 
    var lp = fs.openSync(fd, 'w');
    fs.writeSync(lp, str);
    fs.close(lp);   
    /*
    sync(fs, 'writeFile')
    sync.fiber(function(){
    //    fs.writeFileSync(fd, str, function(err, data){console.log(data)});
        //var lp = fs.openSync(fd, 'w');
        fs.writeFile(fd, str);
    
        fs.close(fd);
    })
*/
    /*
    var lp = fs.openSync(fd, 'w');
    fs.writeSync(lp, str);
    
    fs.close(lp);
    console.log('printed');
    */
}

function printSocket(host,str){
    
    var net = require('net'); 
    var client = new net.Socket();
    client.connect(9100,host);
    client.write(str);
    client.end();
}

function Response(code, type, data){
    this.code = code;
    this.type = type;
    this.data = data;
}

function unknownRequestException(req){
    return new Response(400,"text/html","Invalid request:\n"+req)
}
