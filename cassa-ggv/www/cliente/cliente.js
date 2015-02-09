angular.module('GGVAppCliente',[])

.controller(
  "GGVAppClienteController", ['$scope',function($scope){
  
      var parentOrdine = window.opener.ordine;
      // cambio struttura in: [
      //    nomeGruppo -> [ {ordine di gruppo}, ... ] ]
      
      $scope.ordine = {};
      $scope.totale_ordine = 0;
      var gruppo;
      for(v in parentOrdine.voci){
          gruppo = parentOrdine.voci[v].gruppo;
          $scope.totale_ordine += parentOrdine.voci[v].prezzototale;
        if($scope.ordine.hasOwnProperty(gruppo)){
            $scope.ordine[gruppo].push(parentOrdine.voci[v]);
        }
        else{
            $scope.ordine[gruppo] = [parentOrdine.voci[v]];   
        }
      }
      
      $scope.voci = window.opener.ordine;
      $scope.$opener.$watch('ordine',function (id,newV,oldV){
          console.log([newV,oldV,id]);
          return newV;
      },true);
      Object.watch('parentOrdine',function (id,newV,oldV){
          console.log([newV,oldV,id]);
          return newV;
      });
      
      //setInterval(function(){ console.log(parentOrdine); }, 3000);
      
      $scope.test = parentOrdine;
   }])

;
