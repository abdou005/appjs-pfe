/**
 * Created by abdo on 2016-06-09.
 */
'use strict';
app
	.controller('prestationPrestataireCtrl',function($scope,$rootScope,homeProvider,$http,prestationProvider){

		var refrech = function() {
			//$scope.test = 'testt';
			$scope.prestation = '';
			//$scope.userActiv = '';
		};
		refrech();
		$scope.updateActivite = function(){
			$rootScope.loading = true;
			console.log($scope.userActiv.activite);
			$rootScope.current_user.activite = $scope.userActiv.activite;
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				refrech();
				$rootScope.loading = false;

			});
		};

		$scope.createPrestation = function(){
			$rootScope.loading = false;
			console.log($scope.prestation);
			prestationProvider.createQuestion($scope.prestation,function(prestation){
				console.log(prestation);
				$rootScope.current_user.prestations.push(prestation);
				homeProvider.updateUser($rootScope.current_user,function(data){
					console.log(data);
					$rootScope.current_user = data;
					$rootScope.loading = false;
				});
			});
		};
		$scope.removePrestation = function(id){
			$rootScope.loading = true;
			for(var pres in $rootScope.current_user.prestations){
				console.log($rootScope.current_user.prestations[pres]);
				if($rootScope.current_user.prestations[pres]._id == id){
					$rootScope.current_user.prestations.splice(pres,1);
					homeProvider.updateUser($rootScope.current_user,function(data){
						console.log(data);
						$rootScope.current_user = data;
						$rootScope.loading = false;
					});
				}
			}
		};

	});
