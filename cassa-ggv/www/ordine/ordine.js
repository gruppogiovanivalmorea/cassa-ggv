// order object

angular.module('GGVApp-ordine',[])
//angular.module('GGVApp')

.controller(
    'GGVApp-gestioneOrdineCorrenteController',
    ['$scope','menu','ordine',function($scope,menu,ordine){ 
        $scope.ordine = ordine;
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
})


;

function VoceOrdine(){
  this.val = 0;
  this.inc = function() { this.val++; }
  this.dec = function() { if(this.val > 0) this.val--; }
}
  /*
function voceOrdine(){
  var hidden_val = 0;
  this.inc = function() { hidden_val++; }
  this.dec = function() { if(hidden_val > 0) hidden_val--; }
  this.val = function() { return hidden_val; }
}
*/
