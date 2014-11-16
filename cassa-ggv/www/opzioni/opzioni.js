angular.module('GGVApp-opzioni',[])

.service('opzioni', function(){
    var opzioni = _opzioni;
    var stampanteLocal = window.localStorage.getItem('stampante');
    var stampanteTmp = stampanteLocal != null
        ? JSON.parse(stampanteLocal)
        : null; // TODO valutare
    
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

.controller( 'GGVApp-OpzioniController',  ['$scope','opzioni',function ($scope, opzioni){
    $scope.opzioni = opzioni;
}])

/*
.controller( 'GGVAppOpzioniController', 
            ['$scope','$modal','opzioniService',function ($scope, $modal, opzioniService){
    $scope.opzioniService = opzioniService;
    $scope.apriOpzioni = function(){
        var modalInstance = $modal.open({
            templateUrl: 'opzioni/opzioni.html',
            controller: 'ModalOptionCtrl',
            backdrop: false,
            resolve: { "opzioni": function() { return $scope.opzioniService.opzioni } }
        });

//        modalInstance.result.then(function () {
//          //  $scope.opzioni = opzioni;
//             console.log($scope.opzioni);
//        }, function () {
//            console.log("opzioni");
//            console.log($scope.opzioniService.opzioni);
//        });

    }
}])

*/
/*
.controller('ModalOptionCtrl', 
            ['$scope','$modalInstance','opzioniService',function ($scope, $modalInstance, opzioniService) {


    $scope.opzioniService = opzioniService;
    $scope.ok = function () {
        $scope.opzioniService.salva();
        console.log($scope.opzioniService);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])
*/
;
