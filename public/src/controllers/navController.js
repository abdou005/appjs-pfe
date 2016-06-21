
'use strict';
app
	.controller('navController',function($scope,$location){
		$scope.isActive = function(destination){
			return destination === $location.path();
		}

	});