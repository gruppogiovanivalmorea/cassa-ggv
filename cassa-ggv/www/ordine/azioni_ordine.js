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
             var r = {
                 'nomeRichiesta': 'stampa',
                 'stampante': opzioni.stampante,
                 "ordine": $scope.ordine.ordinePerStampa()
             }
             $http.post('./stampa', r)
             .success(function(data, status, headers, config){
                 console.log(data);

             })
             .error(function(data, status, headers, config){
                 console.log([data, status, headers, config]);
             });
         };

         $scope.archivia = function(){
             var dati = $scope.ordine.datiArchivio();
             console.log(dati);
             var x = $resource('http://localhost\\:5984/ordini').save(JSON.stringify(dati));
             console.log(x);
             /*
             .success(function(data, status, headers, config){
                 console.log(data);
             })
             .error(function(data, status, headers, config){
                 console.log([data, status, headers, config]);
             });*/
         }

         $scope.stampa_archivia = function(){
             console.log(opzioni.stampante);
             if(!verificaStampante()){
                 alert("Tanni! Scegli una stampante!");
                 return;
             }
             var r = {
                 'nomeRichiesta': 'stampa',
                 'stampante': opzioni.stampante,
                 "ordine": ordine.ordinePerStampa()
             }
             $http.post('./stampa', r)
             .success(function(data, status, headers, config){
                 console.log([data, status, headers, config]);

             })
             .error(function(data, status, headers, config){
                 console.log(data);
             });
         };

     }])

.directive('azioniOrdine',function(){
    return {
        restrict : 'E',
        templateUrl : 'ordine/azioniOrdine.html'
    };    
})


;