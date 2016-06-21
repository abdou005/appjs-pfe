'use strict';
app
	.controller('profilClientCtrl',function($scope,$rootScope,homeProvider,$http){
		var refrech = function(){
			$rootScope.loading = true;
			$scope.showDevis = true;
			$scope.showAvis = false;
			$scope.nbrDevisWaiting = 0;
			$scope.nbrAvisWaiting = 0;
			$scope.showPrestataire = false;
			for(var d in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[d].state == 'waiting'){
					$scope.nbrDevisWaiting++;

				}
			}
			for(var a in $rootScope.current_user.avis){
				if($rootScope.current_user.avis[a].state == 'Waiting'){
					$scope.nbrAvisWaiting++;

				}
			}
			$rootScope.loading = false;
		};
		refrech();

		$scope.getDevis = function(){
			$scope.showDevis = true;
			$scope.showAvis = false;
			$scope.showPrestataire = false;

		};
		$scope.isConfirmDevis = function(d){
			if(d == 'confirm'){
				return 'success';
			}else{
				return 'danger';
			}

		};
		$scope.getAvis = function(){
			$scope.showAvis = true;
			$scope.showDevis = false;
			$scope.showPrestataire = false;
		};
		$scope.isConfirmAvis = function(d){
			if(d == 'Confirm'){
				return 'success';
			}else{
				return 'danger';
			}

		};
		$scope.getPrestataire = function(id){
			$rootScope.loading = true;

			if(typeof  id == 'undefined'){
				console.log('No I Id');
				$rootScope.loading = false;
				return false;
			}else {
				homeProvider.editUser(id, function (data) {
					$scope.showPrestataire = true;
					$scope.prestataire = data;
					$rootScope.loading = false;
				});
			}

		};
		$scope.removeDevis = function(id){
			$http.delete('/profil/removeDevis/' +id+'?token='+$rootScope.token_current_user+'&email='+$rootScope.current_user.email).success(function(resp){
				console.log(resp);
			});
			for(var devi in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[devi]._id == id){
					console.log('devis trouver ',$rootScope.current_user.devis[devi]);
					$rootScope.current_user.devis.splice(devi,1);
					homeProvider.updateUser($rootScope.current_user,function(data){
						$rootScope.current_user = data;
					});
				}
			}

		};
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
	.controller('evaluerMissionCtrl',function($scope,homeProvider,$location,$rootScope,Upload,$http,avisProvider){
		$scope.message = "ceci ma page d evaluation";

		var refrech = function(){
			$rootScope.loading = true;
			homeProvider.getUsers(function(data){
				$scope.prestataires = data;
				console.log(data);
				$rootScope.loading = false;
			});
			$scope.missionTemp = '';
			$scope.avis = '';
			$scope.ratingQualityServ = $scope.ratingPriceServ = $scope.ratingRespectPeriod =$scope.ratingContact = $scope.ratingNoteGeneral = 1;
		};
		refrech();
		$scope.getPrestataire = function(p){
			$rootScope.loading = true;
			console.log(p.missions.length);
			console.log(p);
			$scope.showError = false;
			$scope.showDevis = false;
			$scope.showFormulaireEvaluer = false;
			$scope.prestataire = p;
			var nbrDevis = 0;
			var listmission =[];
			var i = 0;
			while (i < p.missions.length) {
				console.log(p.missions[i]._id);
				if ((p.missions[i].devis.clientId == $rootScope.current_user._id) && (p.missions[i].avis == null)){
					nbrDevis +=1;
					console.log('/////////////////// ');
					console.log(p.missions[i].devis);
					listmission.push(p.missions[i]);
					console.log('/////////////////// ');
				}
				i += 1;
			}
			console.log('autre chose ');
			$scope.listMission = listmission;
			if(nbrDevis>0){
				$scope.showFormulaireEvaluer  = true;
				console.log($scope.listMission.length);
				console.log($scope.listMission);
				$scope.showDevis = true;
			}else{
				console.log('no devis in this Prestataire');
				$scope.showError = true;
			}
			$rootScope.loading = false;
		};

		$scope.getMission = function(m){
			console.log(m);
			$scope.missionTemp = m;
			//$scope.showFormulaireEvaluer  = true;

		};

		$scope.evaluer = function(){
			$rootScope.loading = true;
			console.log($scope.missionTemp);
			console.log($scope.prestataire);
			var avis  = {
				desc : $scope.avis.desc,
				state : ['Confirm'],
				noteQualityServ : $scope.ratingQualityServ,
				notePriceServ : $scope.ratingPriceServ,
				noteRespectPeriod : $scope.ratingRespectPeriod,
				noteContact : $scope.ratingContact,
				noteGlobal : $scope.ratingNoteGeneral,
				devisClient : $scope.missionTemp.devis,
				prestataireId : $scope.prestataire._id,
				clientId : $rootScope.current_user._id
			};
			avisProvider.createAvis(avis,function(avis){
				console.log(avis);
				homeProvider.editUser($scope.prestataire._id,function(prest){
					for(var m in prest.missions){
						if(prest.missions[m]._id == $scope.missionTemp._id){
							prest.missions[m].avis = avis;
							homeProvider.updateUser(prest,function(prestUpdate){
								console.log(prestUpdate);
								var noteQualityServ = 0;
								var	notePriceServ = 0;
								var	noteRespectPeriod =0;
								var	noteContact =0;
								var	noteGlobal  =0;
								var nbMission = 0;
								for(var miss in prestUpdate.missions){
									if(prestUpdate.missions[miss].avis != null){
										noteQualityServ +=prestUpdate.missions[miss].avis.noteQualityServ;
										notePriceServ +=prestUpdate.missions[miss].avis.notePriceServ;
										noteRespectPeriod +=prestUpdate.missions[miss].avis.noteRespectPeriod;
										noteContact +=prestUpdate.missions[miss].avis.noteContact;
										noteGlobal +=prestUpdate.missions[miss].avis.noteGlobal;
										nbMission++;
									}
								}
								prestUpdate.noteQualityServ = noteQualityServ/nbMission;
								prestUpdate.notePriceServ = notePriceServ/nbMission;
								prestUpdate.noteRespectPeriod = noteRespectPeriod/nbMission;
								prestUpdate.noteContact = noteContact/nbMission;
								prestUpdate.noteGlobal = noteGlobal/nbMission;
									homeProvider.updateUser(prestUpdate,function(data){
										console.log(data);
											homeProvider.editUser($rootScope.current_user._id,function(client){
												client.avis.push(avis);
													homeProvider.updateUser(client,function(clientUpdate){
														console.log(clientUpdate);
														$rootScope.current_user = clientUpdate;
													});
											});
												for(var m in $scope.listMission){
													if($scope.listMission[m]._id == $scope.missionTemp._id ){
														$scope.listMission.splice(m,1);
													}
												}
										$rootScope.loading = false;
											refrech();
									});
							});
						}
					}
				});
				if($scope.file1){
					console.log('---------File1----------');
					console.log($scope.file1);
					/*Upload.upload({
					 url: '/profil/uploadImgDevis/',
					 data: {user : $rootScope.current_user, devis : resp.devisNormal},
					 file: $scope.file1
					 }).then(function(response) {
					 console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
					 $timeout(function () {
					 $scope.file1.result = response.data.media;
					 });
					 if (response.status > 0){
					 $scope.errorMsg1 = response.status + ': ' + response.data.media.name;
					 console.log('-------------');
					 console.log(response.data);
					 $rootScope.current_user = response.data.user;
					 }
					 },function (resp) {
					 console.log('Error status: ' + resp.status);
					 if (resp.status > 0){
					 $scope.errorMsg1 = resp.status + ': ' + resp.data.media;
					 }
					 }, function(evt) {
					 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					 console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
					 $scope.file1.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					 });*/
				}
			});
		};

		$scope.deselect = function(){
			$scope.missionTemp = '';
			$scope.avis = '';
			$scope.ratingQualityServ = $scope.ratingPriceServ = $scope.ratingRespectPeriod =$scope.ratingContact = $scope.ratingNoteGeneral = 1;
		};


	});