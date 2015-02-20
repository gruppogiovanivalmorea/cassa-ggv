angular.module('GGVApp-scorte', [])

	// TODO remote server via opzioni
	.service('scorte', function () {

		var db = new PouchDB('http://localhost:5984/scorte');
		//db.replicate.to('http://localhost:5984/scorte', {live: true});

		this.scorte = function () {
			return db.allDocs({include_docs: true});
		};

		this.aggiungi = function (scorta) {
			return db.post(scorta);
		};

		this.elimina = function (scorta) {
			return db.remove(scorta);
		};

		return this;

	})

	.controller('GGVApp-ScorteModalController',
		['$scope', 'scorte', 'menu',
			function ($scope, scorte, menu) {
				$scope.prodotti = [''];
				for(g in menu){
					for(p in menu[g]){
						$scope.prodotti.push(menu[g][p].nome);
					}
				}
				
				$scope.nuova = {prodotto: '', qta: '', timestamp: ''};

				$scope.scorte;
				
				function aggiornaScorte() {
					scorte.scorte().then(function (p) {
						$scope.$apply(function(){
							$scope.scorte = p.rows;
						});
					});
				};
				
				aggiornaScorte();

				$scope.aggiungi = function () {
					if ($scope.nuova.prodotto === '' || $scope.nuova.qta === '') {
						alert('Tan metti almeno il nome e il numero!');
						return;
					}
					for(s in $scope.scorte){
						if($scope.scorte[s].doc.prodotto === $scope.nuova.prodotto){
							alert('Tan c\'è già una scorta per questo prodotto! (Toglila...)');
							return;
						}
					}
					$scope.nuova.timestamp = Date.now();
					scorte.aggiungi($scope.nuova).then(aggiornaScorte);
					$scope.nuova = {prodotto: '', qta: '', timestamp: ''};
				};

				$scope.elimina = function (scorta) {
					scorte.elimina(scorta).then(aggiornaScorte);
				};
				
				
			}])


	.directive('modalScorte', function () {
		return {
			restrict: 'E',
			controller: 'GGVApp-ScorteModalController',
			templateUrl: 'scorte/scorte.html'
		};
	})
	;
