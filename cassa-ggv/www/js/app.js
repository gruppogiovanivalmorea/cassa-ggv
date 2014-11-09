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
    //console.log(menu);
    return new Ordine(menu);  
}])

.controller(
  "GGVAppController",
   function( $scope ) {
       $scope.menu = _getMenu();
//       $scope.ordine = new Ordine($scope.menu);
   })

;

// TODO: interrogare il server
function _getMenu(){
	return JSON.parse(localStorage.getItem('menu'));
}