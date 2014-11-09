// order object

angular.module('GGVApp-ordine',[])
//angular.module('GGVApp')

.controller(
    'GGVApp-gestioneOrdineCorrenteController',
    ['$scope','menu','ordine',function($scope,menu,ordine){ 
        $scope.ordine = ordine;
        $scope.totale_ordine;
        $scope.$watch('ordine.voci', function(nuove_voci, vecchie_voci,scope){
            // TODO mettere nel localstorage le voci filtrate (qta>0)
            window.localStorage.setItem('vociOrdine',JSON.stringify(nuove_voci));
            if (finestraOrdineAttuale != null && !finestraOrdineAttuale.closed)
                finestraOrdineAttuale.location.reload();
        }, true);
        
        var finestraOrdineAttuale;
        $scope.apriFinestraOrdine = function(){
            if (finestraOrdineAttuale == null || finestraOrdineAttuale.closed) {
                finestraOrdineAttuale = window.open(
                    'ordineAttualeCliente_js.html',
                    'Ordine',
                    'fullscreen');
            }
        };
       
    }])


.controller(
    "GGVAppControllerCliente", function($scope, menu){
        $scope.menu = JSON.parse(localStorage.getItem('menu'));;
        $scope.vociOrdine = JSON.parse(localStorage.getItem('vociOrdine'));;
    })


.directive('gestioneOrdineCorrente',function(){
    return {
        restrict : 'E',
        templateUrl : 'ordine/gestioneOrdineCorrente.html'
    };
})


;

