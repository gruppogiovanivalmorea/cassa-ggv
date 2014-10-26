var GGVApp = new Object();

GGVApp.menu = _getMenu();

GGVApp.ordine = new ordine();
GGVApp.watch('ordine',function(id, oldval, newval){ console.log(GGVApp.ordine); });


GGVApp.start = function(){
  JSHTML.generaPaginaIniziale();
}


GGVApp.stampa = function(){

}

GGVApp.archivia = function(){

}

// TODO: interrogare il server
function _getMenu(){
	return JSON.parse(localStorage.getItem('menu'));
}
