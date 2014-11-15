// order object

function Ordine(menu) {

    this.timestamp = Date.now();
    this.cassa = "Test"; // TODO ragionare su id cassa
    this.note = "";
    this.progressivo = 0; // TODO valutare se serve
    this.voci = {};
//    var _menuFlat = oneLevelFlatten(Object.values(menu));
//    for(var i in _menuFlat){
//        this.voci[_menuFlat[i].nome] = new voceOrdine();
//    }
    for(var gruppo in menu){
        if(!menu.hasOwnProperty(gruppo)) continue;
        for(var i in menu[gruppo]){
            this.voci[menu[gruppo][i].nome] = 
              new voceOrdine(menu[gruppo][i].nome,gruppo,menu[gruppo][i].prezzo);
        }
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
