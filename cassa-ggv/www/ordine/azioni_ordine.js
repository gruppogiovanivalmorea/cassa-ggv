angular.module('GGVApp-ordine')

.controller(
    'GGVApp-azioniOrdineController',
    ['$http','$scope','menu','ordine',
     function($http,$scope,menu,ordine){ 
        $scope.ordine = ordine;
        $scope.stampa_archivia = function(){
            var r = {
                'nomeRichiesta': 'stampa',
                'stampante': {
                    "tipo": "file", 
                    "nome": "/dev/usb/lp3"
                },
                "ordine": $scope.ordine
            }
            $http.post('./stampa', r)
            .success(function(data, status, headers, config){
                console.log(data);
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