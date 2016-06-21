/**
 * Created by abdo on 2016-06-09.
 */
'use strict';
app
	.controller('profilSuperAdminCtrl',function($scope,$rootScope,homeProvider,$http){

		var refrech = function() {
			$rootScope.loading = true;
			$scope.user = '';
			$scope.showErrorLogin = $scope.showConfirmLogin = false;
			$http({method: 'GET', url: '/users/home'}).success(function(resp){
				$scope.users = resp;
				$rootScope.loading = false;
			});
		};

		$scope.createUser = function(){
			$rootScope.loading = true;
			$scope.user.statut = 'actif';
			homeProvider.registerUser($scope.user,function(data){
				console.log(data);
				refrech();
				if(typeof  data._id == 'undefined'){
					console.log('No ID');
					$scope.showConfirmLogin = false;
					$scope.showErrorLogin = true;
					$scope.error_message = 'Compte existe avec cette adresse e-mail';
				}else{
					$scope.showErrorLogin = false;
					$scope.showConfirmLogin = true;
					$scope.message = 'Utilisateur enregistré --> e-mail :'+data.email+' // password : '+data.password;
				}
			});
		};
		refrech();


	});



