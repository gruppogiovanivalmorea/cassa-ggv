angular.module('GGVApp-scorte', [])

// TODO query: http://localhost:5984/ordini/_design/scorte/_view/nome_timestamp?startkey=[%22patatine%22,0]&endkey=[%22patatine%22,9999999999999999999999999999999]&group_level=1

	// TODO remote server via opzioni
	.service('scorte', function (opzioni) {

		var db = new PouchDB(opzioni.getCouchDbSyncString()+'scorte');
		//db.replicate.to('http://localhost:5984/scorte', {live: true});

		this.changes = db.changes({
			since: 20,
			live: true
		});
		
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
	
	.service('scorteEffettive', function (scorte) {
		
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
				
				
				scorte.changes.on('change', aggiornaScorte );
				scorte.changes.on('create', aggiornaScorte );
				scorte.changes.on('delete', aggiornaScorte );
				
				function aggiornaScorteEffetive(){
					for(s in $scope.scorte){
						
					}
				}

				
			}])


	.directive('modalScorte', function () {
		return {
			restrict: 'E',
			controller: 'GGVApp-ScorteModalController',
			templateUrl: 'scorte/modal_scorte.html'
		};
	})
	
	.directive('pannelloScorte', function () {
		return {
			restrict: 'E',
			controller: 'GGVApp-ScorteModalController',
			templateUrl: 'scorte/pannello_scorte.html'
		};
	})
	;
