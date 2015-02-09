angular.module('GGVApp-ordine')

.controller(
    'GGVApp-azioniOrdineController',
    ['$resource','$http','$scope','menu','ordine','opzioni',
     function($resource,$http,$scope,menu,ordine,opzioni){ 
         
         function verificaStampante(){
             return opzioni.hasOwnProperty('stampante') &&
                 opzioni.stampante != '';
         }
                  
         $scope.stampa = function(){
             if(!verificaStampante()){
                 alert("Tanni! Scegli una stampante!");
                 return;
             }
             var ordinePerStampa = ordine.ordinePerStampa()
             if(ordinePerStampa.voci.length == 0){
                alert("Tanni! L'ordine è vuoto");
                 return;
             }
             var r = {
                 'nomeRichiesta': 'stampa',
                 'stampante': opzioni.stampante,
                 "ordine": ordinePerStampa
             }
             $http.post('./stampa', r)
             .success(function(data, status, headers, config){
                 console.log(data);
                 $scope.cancella();
             })
             .error(function(data, status, headers, config){
                 console.log([data, status, headers, config]);
                 alert(data);
             });
         };

         $scope.archivia = function(){
             var dati = ordine.datiArchivio();
             if(dati.voci.length == 0){
                alert("Tanni! L'ordine è vuoto");
                 return;
             }
             $http.post('http://localhost:5984/ordini',dati)
             .success(function(data, status, headers, config){
                 console.log(data);
                 $scope.cancella();
             })
             .error(function(data, status, headers, config){
                 console.log([data, status, headers, config]);
                 localStorage.setItem('ggv-log',[data, status, headers, config]);
                 alert("C'è stato un problema nell'archiviazione dei dati.\n"+
                      "Meglio se chiami il tan (ciups) e intanto cambi pc!");
             });
         }

         $scope.stampa_archivia = function(){
             console.log(opzioni.stampante);
             if(!verificaStampante()){
                 alert("Tanni! Scegli una stampante!");
                 return;
             }
             var ordinePerStampa = ordine.ordinePerStampa()
             if(ordinePerStampa.voci.length == 0){
                alert("Tanni! L'ordine è vuoto");
                 return;
             }
             var r = {
                 'nomeRichiesta': 'stampa',
                 'stampante': opzioni.stampante,
                 "ordine": ordinePerStampa
             }
             $http.post('./stampa', r)
             .success(function(data, status, headers, config){
                 console.log([data, status, headers, config]);
                 $scope.archivia();
             })
             .error(function(data, status, headers, config){
                 console.log(data);
                 alert(data);
             });
         };
         
         $scope.cancella = function(){
            ordine.reset();
         }

     }])

.directive('azioniOrdine',function(){
    return {
        restrict : 'E',
        templateUrl : 'ordine/azioniOrdine.html'
    };    
})


;