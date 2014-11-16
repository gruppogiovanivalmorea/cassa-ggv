angular.module('GGVApp-opzioni',[])

.service('opzioni',function(){
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

.filter('filtraMenuOpzioni', function() {
    return function(input) {
        console.log(input);
        return !$.inArray(input, ['stampante','stampanti']);
    };
})

.controller('GGVApp-OpzioniModalController', 
            ['$scope','opzioni',function ($scope, opzioni) {

    console.log(opzioni);
    console.log($scope.opzioni);
    $scope.opzioni_elenco = _opzioni_elenco;
    
                
    $scope.ok = function () {
        
        console.log($scope.opzioni);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])

;
