angular.module('GGVApp')

//.value('opzioni', db_opzioni)

.service('opzioniService', function(){
    this.opzioni = sessionStorage.getItem('db_opzioni',db_opzioni);
    this.salva = function(){
        sessionStorage.setItem('db_opzioni',this.opzioni);
    };
})

.controller( 'GGVAppOptionsController', function ($scope, $modal, opzioni){
    $scope.opzioni = opzioni;
    $scope.apriOpzioni = function(){
        var modalInstance = $modal.open({
            templateUrl: 'tpl/opzioni.html',
            controller: 'ModalOptionCtrl',
            backdrop: false,
            resolve: { "opzioni": function() { return $scope.opzioni } }
        });
        
        modalInstance.result.then(function (opzioni) {
            $scope.opzioni = opzioni;
             console.log($scope.opzioni);
        }, function () {
            console.log("opzioni: "+$scope.opzioni);
        });
    }
})

.controller('ModalOptionCtrl', ['opzioniService',function ($scope, $modalInstance, opzioniService) {
    $scope.opzioniServ = opzioniService;
    $scope.pez = "pezss";
    $scope.ok = function () {
        $modalInstance.close($scope.opzioni);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])

;