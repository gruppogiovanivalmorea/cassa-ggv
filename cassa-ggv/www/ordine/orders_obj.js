// order object

function Ordine(menu) {

    this.timestamp = Date.now();
    this.cassa = "Test"; // TODO ragionare su id cassa
    this.note = ""; // TODO nota che le note le hanno le voci!!!
    this.progressivo = 0; // TODO valutare se serve
    this.voci = [];
    
//    this.voci = {}; // old
    
//    var _menuFlat = oneLevelFlatten(Object.values(menu));
//    for(var i in _menuFlat){
//        this.voci[_menuFlat[i].nome] = new voceOrdine();
//    }
    for(var gruppo in menu){
        if(!menu.hasOwnProperty(gruppo)) continue;
        for(var i in menu[gruppo]){
        //    this.voci[menu[gruppo][i].nome] =  // old
            this.voci.push(new voceOrdine(menu[gruppo][i].nome,gruppo,menu[gruppo][i].prezzo));
        }
    }
    
    this.vocePerNome = function(nome){
        for(var voce in this.voci){
            if(this.voci[voce].nome == nome)
                return this.voci[voce];
        }
        return null;
    };
    
    this.ordinePerStampa = function(){
        // TODO valutare note sul singolo scontrino
        var nuovo = new Object();
        nuovo.timestamp = this.timestamp;
        nuovo.voci = [];
        for(v in this.voci){
            if(this.voci[v].qta > 0){
                nuovo.voci.push(this.voci[v]);
            }   
        }
        return nuovo;
    }
    
    this.datiArchivio = function(){ 
        // TODO valutare bene formato dati
        //  per ora: come stampa ma tolgo info dividi stampa + prezzo(unitario|totale)
        var nuovo = this.ordinePerStampa();
        for(v in nuovo.voci){
            nuovo.voci[v] = this.datiArchivioSingolaVoce(nuovo.voci[v]);
        }
        return nuovo;
    }
    
    this.datiArchivioSingolaVoce = function(voce){
        var nuova = new Object();
        nuova.qta = voce.qta;
        nuova.nome = voce.nome;
        nuova.gruppo = voce.gruppo;
        nuova.prezzounitario = voce.prezzo;
        nuova.prezzototale = voce.prezzo * voce.qta;
        return nuova;
    }
};

function voceOrdine(prodotto, gruppo, prezzo){
    //console.log(prodotto, gruppo);
    this.qta = 0;
    this.nome = prodotto; 
    this.gruppo = gruppo;
    this.prezzo = prezzo;
    this.dividiStampa = false;
    this.inc = function() { this.qta++; }
    this.dec = function() { if(this.qta > 0) this.qta--; }

    
}
  /*
function voceOrdine(){
  var hidden_val = 0;
  this.inc = function() { hidden_val++; }
  this.dec = function() { if(hidden_val > 0) hidden_val--; }
  this.val = function() { return hidden_val; }
}*/
