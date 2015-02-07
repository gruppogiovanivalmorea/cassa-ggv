var printer = require("../printer");

var ordine = {
    'timestamp' : Date.now(),
    'cassa' : 'cassa-1',
    'voci' : {
        'birra' : {"nome":"birra", "qta":"3", "gruppo":"bar"},
        'patolle' : {"nome":"patolle", "qta":"3", "gruppo":"cucina"},
        'strippi vari' : {"nome":"birra", "qta":"3", "gruppo":"cucina"}
    }
}

var richiesta = {
    'nomeRichiesta': 'stampa',
    'stampante': {
        "tipo": "file", 
        "nome": "/dev/usb/lp4"
    },
    "ordine": ordine
}


printer.print(richiesta);
for (i=0;i<10;i++){
    x = printer.print(richiesta);
    console.log(x)
}