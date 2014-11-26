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

.filter('filtraMenuOpzioni', function() {
    return function(input) {
        console.log(input);
        return !$.inArray(input, ['stampante','stampanti']);
    };
})

.controller('GGVApp-OpzioniModalController', 
            ['$scope','opzioni',function ($scope, opzioni) {

    $scope.opzioni = opzioni
    $scope.opzioni_elenco = _opzioni_elenco;
    $scope.opzioni_elenco_save = clone($scope.opzioni_elenco);
   
    $scope.ok = function () {
        for(var opzione_idx in $scope.opzioni_elenco){
            $scope.opzioni[$scope.opzioni_elenco[opzione_idx].nome] = 
                $scope.opzioni_elenco[opzione_idx].valore;
        }
        console.log($scope.opzioni_elenco);
        window.localStorage.setItem('opzioni',JSON.stringify($scope.opzioni));
    };

    $scope.cancel = function () {
        $scope.opzioni_elenco = $scope.opzioni_elenco_save;
    };
}])

;
