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
    var opzioni = _opzioni;
    var stampanteLocal = window.localStorage.getItem('stampante');
    var stampanteTmp = stampanteLocal != null
        ? JSON.parse(stampanteLocal)
        : null; // TODO valutare
    
 //   console.log(stampanteTmp);
    if(stampanteTmp != null) { 
        for(var s_idx in opzioni.stampanti){
            var s = opzioni.stampanti[s_idx];
  //          console.log(s_idx);console.log(s);
            if(s.nome == stampanteTmp.nome && s.tipo == stampanteTmp.tipo){
                opzioni.stampante = opzioni.stampanti[s_idx];
    //            console.log("match: "+s_idx);   
            }
        } 
    }
 //   console.log(opzioni.stampante);
    //opzioni.stampante = opzioni.stampanti[1];
        
    //opzioni.indiceStampanteSelezionata;
    opzioni.watch('stampante',function(id,vecchio,nuovo){ 
        window.localStorage.setItem('stampante',JSON.stringify(nuovo));
   //     console.log(nuovo); console.log(opzioni.stampante);
        return nuovo;
    });
  //  console.log(opzioni.stampanti);
/*
    opzioni.watch('stampante',function(id,vecchia,nuova){
        // TODO salvare se !null, e null non deve essere previsto!
        if(nuova != null) window.localStorage.setItem('stampante',JSON.stringify(nuova));
        console.log(nuova);
        return nuova;
    });*/
    return opzioni;
  //  return _opzioni;
})

.controller( 'GGVApp-OpzioniController',  ['$scope','opzioni',function ($scope, opzioni){
    $scope.opzioni = opzioni;
   // $scope.stampante = stampante.stampante; //window.localStorage.getItem('stampante');
   // console.log($scope.opzioni.stampante);
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
