// order object

angular.module('GGVApp-ordine',[])
//angular.module('GGVApp')

.controller(
    'GGVApp-gestioneOrdineCorrenteController',
    ['$scope','menu','ordine',function($scope,menu,ordine){ 
        $scope.ordine = ordine;
        $scope.totale_ordine = 27;
        $scope.$watch('ordine.voci', function(nuove_voci, vecchie_voci,scope){
          scope.totale_ordine = 0.0;
          for(var voce_key in nuove_voci){
            var voce =  nuove_voci[voce_key];
            scope.totale_ordine += voce.qta * voce.prezzo;
          }
        }, true);
    }])




.directive('gestioneOrdineCorrente',function(){
    return {
        restrict : 'E',
        templateUrl : 'ordine/gestioneOrdineCorrente.html'
    };
})

.directive('visualizzazioneOrdineCorrente',function(){
    return {
        restrict : 'E',
        templateUrl : 'ordine/visualizzazioneOrdineCorrente.html'
    };
});

