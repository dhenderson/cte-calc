function CTEController($scope) {
	
	$scope.programCost = 0;
	$scope.averageCostPerPerson = null;
	$scope.totalNumberOfPeople = null;
	$scope.weightedAverageCTE = null;
	$scope.groupNumber = 2;
	
	$scope.targets = new Array({
			name : 'Group 1',
			n : 0,
			averageValue : 0,
			cte : 0
	});
	
	$scope.newTarget = function(){
		
		$scope.targets.push({
			name : 'Group ' + $scope.groupNumber,
			n : 0,
			averageValue : 0,
			cte : 0
		});
		
		$scope.groupNumber = $scope.groupNumber + 1;
	}
	
	calculateCTE = function(averageValue, n) {

		var averageCost = parseFloat($scope.programCost)/n;
		var cte = averageValue/averageCost;
		cte = cte.toFixed(2);
		
		if (isNaN(cte)) {
			cte = '---';
		}
		
		return cte;
	}
	
	$scope.calculateAverageCostPerPerson = function(){
		var averageCost = parseFloat($scope.programCost)/$scope.totalNumberOfPeople
		
		$scope.averageCostPerPerson = averageCost.toFixed(2);
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
	
		// strip non numeric except "." for program cost
		if ($scope.programCost != 0) {
			$scope.programCost = $scope.programCost.replace(/[^\d.-]/g, '');
		}
		
		for (var key in $scope.targets){
			var target = $scope.targets[key];
			
			// strip non-numeric except "."
			if (target.averageValue != 0) {
				target.averageValue = target.averageValue.replace(/[^\d.-]/g, '');
			}
			// can't have fractional people, so strip all non-numeric
			if (target.n != 0) {
				target.n = target.n.replace(/\D/g,'');
			}
			
			target.cte = calculateCTE(target.averageValue, target.n);
		}
	}
   $scope.$watch('programCost', function() {
       $scope.updateCTE();
   });
	
	$scope.removeTarget = function(key) {
		$scope.targets.splice(key, 1);
		
		$scope.countTotalNumberOfPeople();
		$scope.calculateAverageCostPerPerson();
		$scope.calculateWeightedAverageCTE();	
	}
	
	
}
