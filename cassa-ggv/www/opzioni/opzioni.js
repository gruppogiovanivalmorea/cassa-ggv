angular.module('GGVApp-opzioni',[])

.service('opzioni',function(){
     // TODO attenzione: ora sembra non andare perchè nel modal stampo 
    // l'oggetto _opzioni_elenco che è statico e non varia in base a ordine in localstorage!
    var opzioni = JSON.parse(
        window.localStorage.getItem(
            'opzioni',
            JSON.stringify(_opzioni))
    );
    
    var stampanteLocal = window.localStorage.getItem('stampante');
    var stampanteTmp = stampanteLocal != null
        ? JSON.parse(stampanteLocal)
        : null; // TODO valutare
    
    //console.log(stampanteTmp);
    if(stampanteTmp != null) { 
        for(var s_idx in opzioni.stampanti){
            var s = opzioni.stampanti[s_idx];
            if(s.nome == stampanteTmp.nome && s.tipo == stampanteTmp.tipo){
                opzioni.stampante = opzioni.stampanti[s_idx];
            }
        } 
    }
        
    opzioni.watch('stampante',function(id,vecchio,nuovo){ 
        window.localStorage.setItem('stampante',JSON.stringify(nuovo));
        return nuovo;
    });
    return opzioni;
})


.controller( 'GGVApp-OpzioniController',  
            ['$scope','opzioni',function ($scope,opzioni){
    $scope.opzioni = opzioni;
}])

/*
.filter('filtraMenuOpzioni', function() {
    return function(input) {
        console.log(input);
        return !$.inArray(input, ['stampante','stampanti']);
    };
})
*/

.controller('GGVApp-OpzioniModalController', 
            ['$http','$scope','opzioni',function ($http, $scope, opzioni) {

    $scope.opzioni = opzioni
    $scope.opzioni_modal = angular.copy($scope.opzioni);
   
    $scope.ok = function () {
        /*
        for(var opzione_idx in $scope.opzioni_elenco){
            $scope.opzioni[$scope.opzioni_elenco[opzione_idx].nome] = 
                $scope.opzioni_elenco[opzione_idx].valore;
        }
        */
        $scope.opzioni = angular.copy($scope.opzioni_modal);
        console.log($scope.opzioni);
        window.localStorage.setItem('opzioni',JSON.stringify($scope.opzioni));
    };

    $scope.cancel = function () {
        $scope.opzioni_modal = angular.copy($scope.opzioni);
        console.log($scope.opzioni);
    };
                
    $scope.caricaStampanti = function(){
        $http.get('./stampanti')
             .success(function(data, status, headers, config){
                 console.log('ok! '+[data, status, headers, config]);
             })
             .error(function(data, status, headers, config){
                 console.log('err! '+[data, status, headers, config]);
             });
    }
}])


.directive('modalOpzioni',function(){
    return {
        restrict : 'E',
        controller : 'GGVApp-OpzioniModalController',
        templateUrl : 'opzioni/opzioni.html'
    };    
})

;
