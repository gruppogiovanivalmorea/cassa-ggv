// order object

function ordine(){
	this.timestamp = Date.now();
	this.cassa = "Test"; // TODO ragionare su id cassa
	this.note = "";
	this.progressivo = 0; // TODO valutare se serve
	this.voci = {};

  this.watch('voci',function(id, oldval, newval){ console.log(GGVApp.ordine); });

	this.inc = function(key){
		if ( !(key in this.voci) ) this.voci[key] = 1;
		else this.voci[key]++;

    console.log("inc "+key+" val="+ this.voci[key])
	}

	this.dec = function(key){
		if ( !(key in this.voci) ) this.voci[key] = 0;
		else this.voci[key]--;
		if(this.voci[key] < 0) delete this.voci[key];

    console.log("dec "+key+" val="+ this.voci[key])
	}

	this.get = function(key){
		return ( key in this.voci ) ? this.voci[key] : 0;
	}

}

