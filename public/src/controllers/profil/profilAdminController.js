'use strict';
app
	.controller('profilAdminCtrl',function($scope,$rootScope,homeProvider,$http){
		$scope.message = "ceci mon profil page Admin";
		console.log('my profil page');


		$scope.setDefaultMedia = function(media){
			$rootScope.loading = true;
			console.log(media);
			$rootScope.current_user.mediaProfil = media;
			homeProvider.updateUser($rootScope.current_user,function(data){
				$rootScope.current_user = data;
				$rootScope.loading = false;
			});
		};
		$scope.removeMedia = function(media){
			$rootScope.loading = true;
			console.log(media);
			$http.delete('/profil/removeAvatar?token='+$rootScope.token_current_user+'&urlMedia='+media.urlMedia).success(function(resp){
				console.log(resp);
			});
			for(var m in $rootScope.current_user.medias){
				if($rootScope.current_user.medias[m]._id == media._id){
					console.log('Mddia trouver ',$rootScope.current_user.medias[m]);
					$rootScope.current_user.medias.splice(m,1);
					homeProvider.updateUser($rootScope.current_user,function(data){
						$rootScope.current_user = data;
						$rootScope.loading = false;
					});
				}
			}
		};
		$scope.updateUserProfil = function(){
			$rootScope.loading = true;
			console.log($rootScope.current_user);
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				$rootScope.loading = false;
			});
		};
		$scope.getcurrentPassword = function(){
			$scope.showNewPass = true;
			$scope.showConfPass = true;
			$scope.showRegisterPass = true;
			console.log($scope.currentPassword);
			if($scope.currentPassword == $rootScope.current_user.password){
				$scope.showNewPass = true;
				$scope.messageOkPassword = 'votre Nouveau Mot de passe';
				$scope.messageErrorPassword = '';
			}else{
				$scope.showNewPass = false;
				$scope.messageErrorPassword = 'Mot de passe incorrect !';
				$scope.messageOkPassword = '';
			}
		};
		$scope.getNewPassword = function(){
			if(typeof  $scope.newPassword == 'undefined'){
				console.log('No I new Passowrd');
				$scope.messageErrorPassword = 'Nouveau Mot de passse Vide';
				$scope.messageOkPassword = '';
				return false;
			}
			if($scope.newPassword.length >= 6){
				$scope.messageOkPassword = 'Confirmer votre mot de passe';
				$scope.messageErrorPassword = '';
				$scope.showConfPass = true;
			}else{
				$scope.showConfPass = false;
				$scope.messageErrorPassword = 'Taille min 6 !';
				$scope.messageOkPassword = '';
			}
		};

		$scope.getConfPassword = function(){
			if(typeof  $scope.newPassword == 'undefined'){
				console.log('No I conf Passowrd');
				$scope.messageErrorPassword = 'Nouveau Mot de passse Vide';
				$scope.messageOkPassword = '';
				return false;
			}
			if($scope.confirmPassword == $scope.newPassword){
				$scope.messageOkPassword = 'Enregister Mot de passe';
				$scope.messageErrorPassword = '';
				$scope.showRegisterPass = true;
			}else{
				$scope.showRegisterPass = false;
				$scope.messageErrorPassword = 'Confirmer votre mot de passe !';
				$scope.messageOkPassword = '';
			}
		};
		$scope.deselectPass = function(){
			$scope.confirmPassword = $scope.newPassword = $scope.currentPassword = '';
			$scope.showNewPass = true;
			$scope.showConfPass = true;
			$scope.showRegisterPass = true;
			$scope.messageOkPassword = 	$scope.messageErrorPassword = '';
		};
		$scope.updatePassword = function(){
			console.log($scope.newPassword);
			$rootScope.loading = true;
			$rootScope.current_user.password = $scope.newPassword
			console.log($rootScope.current_user.password);
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				$scope.confirmPassword = $scope.newPassword = $scope.currentPassword = '';
				$scope.showNewPass = true;
				$scope.showConfPass = true;
				$scope.showRegisterPass = true;
				$scope.messageOkPassword ='Mot de passe modifié avec succès';
				$rootScope.loading = false;
			});

		};
	});


