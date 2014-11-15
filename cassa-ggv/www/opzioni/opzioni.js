angular.module('GGVApp-opzioni',[])

/*
.service('opzioniService', function(){
    var localOpzioni = JSON.parse(window.localStorage.getItem("opzioni"));
    this.opzioni = localOpzioni != null ? localOpzioni : _opzioni;

    this.salva = function(){
        //  console.log("salva");
        //    console.log(this.opzioni);
        sessionStorage.setItem('opzioni',this.opzioni);
    };
    this.caricaDefault = function(){
        this.opzioni = _opzioni;
        this.salva();
    };
    return this;
})
*/
.service('opzioni', function(){
    return _opzioni;
})

.controller( 'GGVApp-OpzioniController',  ['$scope','opzioni',function ($scope, opzioni){
    $scope.opzioni = opzioni;
    $scope.stampante = window.localStorage.getItem('stampante');
    $scope.$watch('stampante',function(nuova,vecchia){
        console.log("cambio stampante");
        window.localStorage.setItem('stampante',nuova);
    });
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