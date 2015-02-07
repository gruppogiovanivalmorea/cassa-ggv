
angular.module('GGVApp-ordine',['ngResource'])
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
    ['$scope','menu','ordine','vistaGestioneOrdine',//'finestraCliente',
     function($scope,menu,ordine,vistaGestioneOrdine,ordineFiltratoMappatoPerGruppo){//,finestraCliente){ 
        $scope.ordine = ordine;
        $scope.totale_ordine;
        $scope.ordineFiltrato = new Object();
        $scope.ordineFiltratoNonVuoto;
        //$scope.finestraCliente = finestraCliente;
         
        $scope.$watch('ordine.voci', function(nuove_voci, vecchie_voci,scope){
            $scope.filtraOrdine();
            window.localStorage.setItem('vociOrdine',JSON.stringify($scope.ordineFiltrato));
            //$scope.finestraCliente.aggiorna();
        }, true);
         
        $scope.filtraOrdine = function(){
            var ordineFiltrato = new Object();
            $scope.totale_ordine = 0;
            for(gruppo in menu){
                var vociGruppo = [];
                for(prodotto in menu[gruppo]){
                    var nome = menu[gruppo][prodotto].nome;
                    var voce = ordine.vocePerNome(nome)
                    if(voce.qta > 0) {
                        vociGruppo.push(voce);
                        $scope.totale_ordine += voce.prezzo * voce.qta;   
                    }
                }
                if(vociGruppo.length > 0) ordineFiltrato[gruppo] = vociGruppo;         
            }
            $scope.ordineFiltratoNonVuoto = !isEmpty(ordineFiltrato); 
            $scope.ordineFiltrato = ordineFiltrato;
            
        }
        
        var finestraOrdineAttuale;
        
        $scope.vistaGestioneOrdine = vistaGestioneOrdine;
 
    }])

.directive('gestioneOrdineCorrente',['vistaGestioneOrdine',function(vistaGestioneOrdine){
    return {
        restrict : 'E',
        controller: "GGVApp-gestioneOrdineCorrenteController",
        templateUrl : vistaGestioneOrdine.vista.url
    };
}])




.service('finestraCliente',['ordine','$interval',function(ordine,$interval){
    this.attiva = false; // TODO prendere valore da opzioni o localstorage
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
    
    

    
    return this;
}])


.controller(
    "GGVApp-ParentFinestraClienteController", 
    ['$scope','$interval','ordine','finestraCliente', function($scope,$interval,ordine,finestraCliente){
        //$scope.finestraCliente = finestraCliente; // TODO prendere da opzioni o localstorage
        $scope.ordine = ordine;
        $scope.attiva = false;
        
        $scope.finestraOrdineAttuale;
        $scope.interval;
        $scope.aggiornaIcona = function(){
       //     console.log($scope.attiva);
            if($scope.finestraOrdineAttuale == null) $scope.attiva = false;
            else if($scope.attiva == $scope.finestraOrdineAttuale.closed) 
                $scope.attiva = !$scope.finestraOrdineAttuale.closed;
        };
        $scope.aggiornaIcona();
    
        
        $scope.$watch('attiva',function(newV,oldV,scope){
            if(newV){
                if($scope.finestraOrdineAttuale != null && !$scope.finestraOrdineAttuale.closed) return;
                $scope.finestraOrdineAttuale = window.open(
                    'index2.html',
                    'Ordine',
                    'fullscreen,dialog'
                );
                $scope.interval = $interval($scope.aggiornaIcona, 1000);
            }
            else{
                if($scope.finestraOrdineAttuale == null) return;
                $scope.finestraOrdineAttuale.close();
                $interval.cancel($scope.interval);
            }
            return newV;
        });
        
    }])

.controller(
    "GGVApp-ChildFinestraClienteController", 
    ['$scope', 'ordine','finestraCliente', function($scope,ordine,finestraCliente){
        $scope.finestraCliente = finestraCliente; // TODO prendere da opzioni o localstorage
        $scope.ordine = ordine;
  
        
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