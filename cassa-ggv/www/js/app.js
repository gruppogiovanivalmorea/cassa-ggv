angular.module('GGVApp',[
    'GGVApp-ordine',
    'ngTouch',
    'ui.bootstrap'])

.service('menu', function() {
    var m = localStorage.getItem('menu') === null
        ? _menu
        : localStorage.getItem('menu');
    return JSON.parse(m);
})

.service('ordine', ['menu',function(menu){
    return new Ordine(menu);  
}])

.controller(
  "GGVAppController", ['$scope','menu',function($scope, menu){
       $scope.menu = menu;
     // console.log(menu);
//       $scope.ordine = new Ordine($scope.menu);
   }])

;

// TODO: interrogare il server
function _getMenu(){
	return JSON.parse(localStorage.getItem('menu'));
}