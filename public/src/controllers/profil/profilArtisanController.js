'use strict';
app
	.controller('profilArtisanCtrl',function($scope,$rootScope,homeProvider,contentProvider,$http){
		var refrech = function(){
			$scope.showProjectRating = false;
			$scope.showSettingProfil = true;
			$scope.showSettingSpec = false;
			$scope.nbrMissionEvaluer = 0;
			for(var m in $rootScope.current_user.missions){
				if($rootScope.current_user.missions[m].avis != null){
					$scope.nbrMissionEvaluer++;
				}
			}

		};
		var refrechSpecialite = function(){
			$scope.user = '';
			$scope.domaine = '';
			$scope.showSpec = true;
		};
		refrech();
		$scope.getProjectsRating = function(){
			$rootScope.loading = true;
			$scope.showSettingProfil = false;
			$scope.showSettingSpec = false;
			$scope.showProjectRating = true;

			$rootScope.loading = false;

		};
		$scope.getClient = function(id){
			$rootScope.loading = true;
			homeProvider.editUser(id,function(data){
				$scope.showClient = true;
				$scope.client = data;
				$rootScope.loading = false;
			});
		};
		$scope.getSettingProfil = function(){
			$rootScope.loading = true;
			$scope.showProjectRating = false;
			$scope.showSettingSpec = false;
			$scope.showSettingProfil = true;

			$rootScope.loading = false;
		};

		$scope.getSettingSpec = function(){
			$rootScope.loading = true;
			$scope.showProjectRating = false;
			$scope.showSettingProfil = false;
			$scope.showSettingSpec = true;
			contentProvider.getDomaines(function(data){
				console.log(data);
				$scope.domaines = data;
				$rootScope.loading = false;
			});
		};

		$scope.getSpecialites = function(d){
			if(typeof d == 'undefined'){
				return false;
			}
			$scope.showSpec = true;
			contentProvider.editDomaine(d,function(data){
				$scope.domaine._id = data._id;
				$scope.specialitesDom = data.specialites;
			});
		};
		$scope.addSpecialite = function(){
			$rootScope.loading = true;
			console.log($scope.user.specialites);
			for(var i =0 ; i<$scope.user.specialites.length; i++){
				console.log($scope.user.specialites[i]);
				for(var sp in $rootScope.current_user.specialites){
					if($rootScope.current_user.specialites[sp].name == $scope.user.specialites[i]){
						console.log($rootScope.current_user.specialites[sp].name);
						$rootScope.current_user.specialites.splice(sp,1);
					}
				}
			}
			for(var i =0 ; i<$scope.user.specialites.length; i++) {
				console.log($scope.user.specialites[i]);
				var spec = {
					name : $scope.user.specialites[i]
				};
				console.log(spec);
				$rootScope.current_user.specialites.push(spec);
			}
			$rootScope.current_user.confirmer = false;
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				$rootScope.loading = false;
				refrechSpecialite();
			});
		};
		$scope.removeSpecialites = function(s){
			$rootScope.loading = true;
			console.log(s);
			for(var sp in $rootScope.current_user.specialites){
				if($rootScope.current_user.specialites[sp].name == s.name){
					console.log($rootScope.current_user.specialites[sp].name);
					$rootScope.current_user.specialites.splice(sp,1);

				}
			}
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				$rootScope.loading = false;
				refrechSpecialite();
			});
		};

		$scope.isActiveDocs = function(state){
			if(state){
				return 'success';
			}else{
				return 'danger';
			}

		};

		$scope.styleDocs = function(type){
			if(type == 'cin'){
				var myStyle={'width': '100%', 'height' : '80px'};
				return myStyle;
			}else if('patente'){
				var myStyle={'width': '100%', 'height' : '120px'};
				return myStyle;
			}else{
				var myStyle={'width': '100%', 'height' : '160px'};
				return myStyle;
			}
		};


		//////




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

	})
	.controller('missionCtrl',function($scope,$rootScope,homeProvider){
		$scope.message = "ceci mes missions";

		var refrech = function(){
			$scope.missions = [];
			for(var m in $rootScope.current_user.missions){
				console.log($rootScope.current_user.missions[m].devis.clientId);
				var myStyle={'width': '0%'};
				var newMission =  $rootScope.current_user.missions[m];

				if($rootScope.current_user.missions[m].state == 'waiting'){
					myStyle.width = '25%';
					newMission.style = myStyle;
				}
				if($rootScope.current_user.missions[m].state == 'inruns'){
					myStyle.width = '50%';
					newMission.style = myStyle;
				}
				if($rootScope.current_user.missions[m].state == 'finish'){
					myStyle.width = '100%';
					newMission.style = myStyle;
				}

				$scope.missions.push(newMission);

			}

		};
		refrech();

		$scope.getClient = function(id){
			homeProvider.editUser(id,function(data){
				$scope.showClient = true;
				$scope.client = data;
			});
		};

		$scope.deleteMission = function(id){
			homeProvider.editUser($rootScope.current_user._id,function(prest){
				for(var m in prest.missions){
					if(prest.missions[m]._id == id){
						prest.missions.splice(m,1);
						homeProvider.updateUser(prest,function(data){
							console.log(data);
							$rootScope.current_user = data;
							refrech();
						});
					}
				}
			});
		};
		$scope.terminerMission = function(id){
			console.log(id);
			homeProvider.editUser($rootScope.current_user._id,function(prest){
				for(var m in prest.missions){
					if(prest.missions[m]._id == id){
						prest.missions[m].state = 'finish';
						homeProvider.updateUser(prest,function(data){
							console.log(data);
							$rootScope.current_user = data;
							refrech();
						});
					}
				}
			});

		};
	});
