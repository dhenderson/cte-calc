function CTEController($scope) {
	
	$scope.programCost = 0;
	$scope.averageCostPerPerson = null;
	$scope.totalNumberOfPeople = null;
	$scope.weightedAverageCTE = null;
	
	$scope.targets = new Array({
			name : 'Group',
			n : null,
			averageValue : null,
			cte : null
	});
	
	$scope.newTarget = function(){
		
		$scope.targets.push({
			name : null,
			n : null,
			averageValue : null,
			cte : null
		});
	}
	
	calculateCTE = function(averageValue, n) {
		var averageCost = $scope.programCost/n;
		var cte = averageValue/averageCost;
		cte = cte.toFixed(2);
		return cte;
	}
	
	$scope.calculateAverageCostPerPerson = function(){
		var averageCost = $scope.programCost/$scope.totalNumberOfPeople
		
		$scope.averageCostPerPerson = averageCost.toFixed(2)
	}
	
	$scope.calculateWeightedAverageCTE = function(){
	
		$scope.weightedAverageCTE = 0;
	
		// update the total number of people first
		$scope.countTotalNumberOfPeople();
		
		for (var key in $scope.targets){
			var target = $scope.targets[key];
			
			var n = parseFloat(target['n']);
			
			// weight for this target
			var weight = n/$scope.totalNumberOfPeople;
			
			var targetCTE = parseFloat(target.cte);
			
			$scope.weightedAverageCTE = $scope.weightedAverageCTE + targetCTE*weight;
		}
		
		$scope.weightedAverageCTE = $scope.weightedAverageCTE.toFixed(2);
		
	}
	
	$scope.countTotalNumberOfPeople = function(){
		var totalN = 0;
		for (var key in $scope.targets){
			var target = $scope.targets[key];
			var numberOfPeople = target['n'];
			if (numberOfPeople != ''){
				totalN = totalN + parseFloat(target['n']);
			}
		}
		$scope.totalNumberOfPeople = totalN;
	}
	
	$scope.updateCTE = function(){
		for (var key in $scope.targets){
			var target = $scope.targets[key];
			target.cte = calculateCTE(target.averageValue, target.n);
		}
	}
   $scope.$watch('programCost', function() {
       $scope.updateCTE();
   });
	
	$scope.removeTarget = function(key) {
		$scope.targets.splice(key, 1);
	}
}
