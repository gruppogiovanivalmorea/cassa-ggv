// order object

angular.module('GGVApp-ordine',[])
//angular.module('GGVApp')

.service('vistaGestioneOrdine', function() { 
    this.viste = [{
        nome: 'Tabella',
        url: 'ordine/gestioneOrdineCorrenteTabella.html',
        controller: "GGVApp-gestioneOrdineCorrenteTabellaController"},
        {
        nome: 'Icone',
        url: 'ordine/gestioneOrdineCorrenteIcone.html',
        controller: "GGVApp-gestioneOrdineCorrenteIconeController"
        }];
    
    var localVista = JSON.parse(window.localStorage.getItem("vistaOrdineCorrente"));
    this.vista = localVista != null ? localVista : this.viste[0];
    this.watch('vista',function(id,oldVal,newVal){ 
      //  console.log(id);console.log(oldVal);console.log(newVal);
        window.localStorage.setItem('vistaOrdineCorrente',JSON.stringify(newVal)); 
        return newVal;
    })
    
    this.vistaLista = function(){ this.vista = this.viste[0]; }
    this.vistaIcone = function(){ this.vista = this.viste[1]; }
    
  //  console.log(this.vista);console.log(localVista);console.log(this.viste);
    return this;
})



.controller(
    'GGVApp-gestioneOrdineCorrenteController',
    ['$scope','menu','ordine','vistaGestioneOrdine',
     function($scope,menu,ordine,vistaGestioneOrdine,ordineFiltratoMappatoPerGruppo){ 
        $scope.ordine = ordine;
        $scope.totale_ordine;
        $scope.ordineFiltrato = new Object();
        $scope.ordineFiltratoNonVuoto;
         
         
        $scope.$watch('ordine.voci', function(nuove_voci, vecchie_voci,scope){
            // TODO mettere nel localstorage le voci filtrate (qta>0)
            $scope.filtraOrdine();
            
            window.localStorage.setItem('vociOrdine',JSON.stringify(nuove_voci));
            if (finestraOrdineAttuale != null && !finestraOrdineAttuale.closed)
                finestraOrdineAttuale.location.reload();
        }, true);
         
        $scope.filtraOrdine = function(){
            var ordineFiltrato = new Object();
            $scope.totale_ordine = 0;
            for(gruppo in menu){
                var vociGruppo = [];
                for(prodotto in menu[gruppo]){
                    var nome = menu[gruppo][prodotto].nome;
                    if(ordine.voci[nome].qta > 0) {
                        vociGruppo.push(ordine.voci[nome]);
                        $scope.totale_ordine += ordine.voci[nome].prezzo * ordine.voci[nome].qta;   
                    }
                }
                if(vociGruppo.length > 0) ordineFiltrato[gruppo] = vociGruppo;         
            }
            $scope.ordineFiltratoNonVuoto = !isEmpty(ordineFiltrato); 
            $scope.ordineFiltrato = ordineFiltrato;
            
        }
        
        var finestraOrdineAttuale;
        $scope.apriFinestraOrdine = function(){
            console.log("apro finestra");
            if (finestraOrdineAttuale == null || finestraOrdineAttuale.closed) {
                finestraOrdineAttuale = window.open(
                    'ordineAttualeCliente_js.html',
                    'Ordine',
                    'fullscreen');
            }
        };
        
        $scope.vistaGestioneOrdine = vistaGestioneOrdine;
         $scope.vistaGestioneOrdineLista = function() {
            vistaGestioneOrdine.vistaLista()
         };
         $scope.vistaGestioneOrdineIcone = function() {
            vistaGestioneOrdine.vistaIcone();
         };
        
    }])

.directive('gestioneOrdineCorrente',['vistaGestioneOrdine',function(vistaGestioneOrdine){
    return {
        restrict : 'E',
        controller: "GGVApp-gestioneOrdineCorrenteController",
        templateUrl : vistaGestioneOrdine.vista.url
    };
}])




.service('finestraCliente',['ordine',function(ordine){
    this.attiva = false;
    this.finestraOrdineAttuale;
//    this.apriFinestraOrdine = function(){
//        if(this.isAttiva()) return;
//        console.log("apro finestra");
//        this.finestraOrdineAttuale = window.open(
//                'index2.html',
//                'Ordine',
//                'fullscreen'
//        );
//    };
    this.isAttiva = function() {
        return this.finestraOrdineAttuale != null && !this.finestraOrdineAttuale.closed;    
    };
    this.aggiorna = function(){
        
    }
    
    this.watch('attiva',function(id,oldV,newV){
        if(newV){
            this.finestraOrdineAttuale = window.open(
                'index2.html',
                'Ordine',
                'fullscreen,dialog'
            );
            this.finestraOrdineAttuale.oldClose = this.finestraOrdineAttuale.close;
            this.finestraOrdineAttuale.close = function(){
                this.attiva = false;
                this.oldClose();
            };
        }
        else{
            this.finestraOrdineAttuale.close();
        }
        return newV;
    });
    
    return this;
}])

.controller(
    "GGVApp-ParentFinestraClienteController", 
    ['$scope', 'ordine','finestraCliente', function($scope,ordine,finestraCliente){
        $scope.finestraCliente = finestraCliente; // TODO prendere da opzioni o localstorage
        $scope.ordine = ordine;
        
        //$scope.menu = JSON.parse(localStorage.getItem('menu'));;
        //$scope.vociOrdine = JSON.parse(localStorage.getItem('vociOrdine'));;
        
        
    }])



/*
.controller(
    "GGVAppControllerCliente", function($scope, menu){
        $scope.menu = JSON.parse(localStorage.getItem('menu'));;
        $scope.vociOrdine = JSON.parse(localStorage.getItem('vociOrdine'));;
    })
    */
;

function isEmpty(map) {
   for(var key in map) {
      if (map.hasOwnProperty(key)) {
         return false;
      }
   }
   return true;
}