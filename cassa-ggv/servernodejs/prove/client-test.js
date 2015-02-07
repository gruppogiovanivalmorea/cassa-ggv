//$ = require('jquery');
oneLevelFlatten = function (l) { return [].concat.apply([],l); }
Object.values = function(obj) { return Object.keys(obj).map(function(key) { return obj[key]; }) }

function Ordine(menu) {
    this.timestamp = Date.now();
	this.cassa = "Test"; // TODO ragionare su id cassa
	this.note = "";
	this.progressivo = 0; // TODO valutare se serve
    this.voci = {};

    tmp = oneLevelFlatten(Object.values(menu));
    for(voce in tmp) {
        this.voci[tmp[voce].nome] = new VoceOrdine();
    }
}
           
function VoceOrdine(){
  this.val = 0;
  this.inc = function() { this.val++; }
  this.dec = function() { if(this.val > 0) this.val--; }
}

var menu = {
	"bar": [
		{"nome": "birra lati", "prezzo": 3.5},
        {"nome": "birra moretti", "prezzo": 2.5}
	],
	"cucina": [
        {"nome": "patatine", "prezzo": 2.5}
	]
};

var ordine = new Ordine(menu)

ordine.voci["birra lati"].inc()

//for(r in ['print','archive','print-archive']){
//    
//}

richiesta = {"requestName": "print", "ordine":ordine};

jsonOrdine = JSON.stringify(richiesta)

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': jsonOrdine.length
};

var options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: headers
};

var http = require('http');

// Setup the request.  The options parameter is
// the object we defined above.
var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

  var response;

  res.on('data', function(data) {
    response = data;
  });

  res.on('end', function() {
    console.log(response);
  });
});

req.on('error', function(e) {
    console.log(e);
});

req.write(jsonOrdine);
