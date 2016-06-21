/**
 * Created by abdo on 2016-04-09.
 */

'use strict';
app
	.controller('devisExpressCtrl',function($scope,Upload,$timeout,$rootScope,devisProvider,socketDevisFactory,contentProvider,$http,homeProvider,notificationProvider,questionProvider){
		var refrech = function(){
			$rootScope.loading = true;
			contentProvider.getDomaines(function(data){
				$scope.domaines = data;
			});
			console.log($rootScope.current_user);
			$scope.message = $scope.error_message = '';
			$scope.devis = $scope.adresse = $scope.message = $scope.user = '';
			$scope.showBtnSendDevis = true;
			for(var adr in $rootScope.current_user.adresses ){
				if($rootScope.current_user.adresses[adr].isDefault){
					$scope.adresseDevis = $rootScope.current_user.adresses[adr];
				}
			}
			$rootScope.loading = false;
			$scope.domaine = '';
			$scope.showSpec = false;
			$scope.showPrestataire = false;
			$scope.specialitesDom=$scope.messages = [];
		};
		refrech();
		$scope.isConfirmDevis = function(d){
			if(d == 'confirm'){
				return 'success';
			}else{
				return 'danger';
			}

		};
		$scope.messages = [];
		socketDevisFactory.on('message',function(data){
			$scope.messages.push(data.message);
		});

		socketDevisFactory.emit('new-client',$rootScope.current_user);

		$scope.setInformation = function(){
			$rootScope.loading = true;
			$scope.devis.adresseDevis = $scope.adresseDevis;
			console.log($scope.devis);
			console.log('--------------------');
			console.log($scope.devis.specialite);
			console.log('--------------------');
			$scope.devis.state = 'waiting'; $scope.devis.type = 'emergency';
			$scope.devis.clientId = $rootScope.current_user._id;
			console.log($rootScope.current_user);
			$rootScope.current_user.devisExpress = $scope.devis;
			$http({method: 'PUT', data: $rootScope.current_user, url: '/users/addDevisExpress', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
				console.log(resp);
				$scope.showBtnSendDevis = false;
				if($scope.file1){
					console.log('---------File1-----------');
					console.log($scope.file1);
						Upload.upload({
							url: '/profil/uploadImgDevis/',
							data: {user : $rootScope.current_user, devis : resp.devisExpress},
							file: $scope.file1
						}).then(function(response) {
							console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
							$timeout(function () {
								$scope.file1.result = response.data.media;
							});
							if(response.status > 0){
								$scope.errorMsg1 = response.status + ': ' + response.data.media.name;
								console.log('---------------------');
								console.log(response.data);
								$rootScope.current_user = response.data.user;
								$rootScope.loading = false;
									socketDevisFactory.emit('new-devis',{
										devis : response.data.devis,
										service : $scope.devis.specialite
									});
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
						});
				}else{
					$rootScope.current_user = resp.user;
					$rootScope.loading = false;
						socketDevisFactory.emit('new-devis',{
							devis : resp.devisExpress,
							service : $scope.devis.specialite
						});
				}
				$rootScope.loading = false;
			});
		};

		$scope.createQuestion = function(devi,offre){
			$rootScope.loading = true;
			console.log(devi);
			console.log(offre);
			console.log(offre._id);
			console.log(offre.prestataireId);
				var str = '#quest'+offre._id;
				var question = {
					contents : $(str).val()
				};
				$(str).val('');
				console.log(question);
				var notification = {
					message : 'Question Recue'
				};
				homeProvider.editUser(offre.prestataireId,function(prestataire){
					console.log(prestataire);
						notificationProvider.createNotif(notification,function(notif){
							console.log(notif);
							prestataire.notifications.push(notif);
								homeProvider.updateUser(prestataire,function(data){
									console.log(data);
									socketDevisFactory.emit('new-notif', data);
									//refrech();
								});
						});
				});
				homeProvider.editUser($rootScope.current_user._id,function(user){
					console.log(user);
					questionProvider.createQuestion(question,function(question){
							console.log(question);
							for(var d in user.devis){
								if(user.devis[d]._id == devi._id){
									for(var o in user.devis[d].offres){
										if(user.devis[d].offres[o]._id == offre._id){
											user.devis[d].offres[o].questions.push(question);
											homeProvider.updateUser(user,function(data){
												$rootScope.current_user = data;
												socketDevisFactory.emit('new-devis-quest',{
													devis : data.devis[d],
													prestataireId: offre.prestataireId
												});
												$rootScope.loading = false;
												//refrech();
											});
										}
									}
								}
							}
						});
				});

		};

		$scope.getPrestataire = function(offre){
			$rootScope.loading = true;
			console.log(offre);
			$scope.prestataire = '';
			$scope.showPrestataire = false;
			homeProvider.editUser(offre,function(data){
				$scope.showPrestataire = true;
				$scope.prestataire = data;
				$rootScope.loading = false;
			});
		};
		$scope.confirmerOffre = function(d,id){
			$rootScope.loading = true;
			console.log(d);
			for(var devi in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[devi]._id == d._id){
					$rootScope.current_user.devis[devi].state = 'confirm';
					$rootScope.current_user.devis[devi].prestataireId = id;
						homeProvider.updateUser($rootScope.current_user,function(client){
									console.log(client);
								$rootScope.current_user = client;
									console.log($rootScope.current_user);
									var notification = {
										message : 'Vous avez une mission en cours'
									};
									homeProvider.editUser(id,function(prestataire){
										console.log(prestataire);
										prestataire.devis  =$rootScope.current_user.devis[devi];
											notificationProvider.createNotif(notification,function(notif){
												prestataire.notifications.push(notif);
													$http({method: 'PUT', data: prestataire, url: '/users/addMission', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
														console.log(resp);
														var notif = {
															prest : resp,
															devis : $rootScope.current_user.devis[devi]
														};
														socketDevisFactory.emit('confirm-offre', notif);
														$rootScope.loading = false;
													});
											});
									});
						});
				}
			}

		};
		socketDevisFactory.on('client-deco',function(userClient){
			console.log(userClient,'Deconnect');
			for(var user in $rootScope.listeUsers ){
				console.log($rootScope.listeUsers[user]._id);
				if($rootScope.listeUsers[user]._id == userClient._id){
					$rootScope.listeUsers.splice(user,1);
				}
			}
		});
		// Refresh the map with new data
		/*$scope.refreshMap = function(){
			//<div id="map{{d._id}}" style="width:150px; height:150px"></div>
			for(var d in $rootScope.current_user.devis){
				console.log($rootScope.current_user.devis[d]._id);
				var latlng = new google.maps.LatLng(-98.350,39.500 );
				var str = 'map'+$rootScope.current_user.devis[d]._id;
				console.log(str);
				var map = new google.maps.Map(document.getElementById(str),{
					zoom : 10,
					center :latlng
					//mapTypeId : google.maps.mapTypeId.SATELLITE
				});
				console.log(map);
			}
		};*/
		$scope.deleteDevis = function(d){
			console.log(d);
			$http.delete('/profil/removeDevis/' + d._id+'?token='+$rootScope.token_current_user+'&email='+$rootScope.current_user.email).success(function(resp){
				console.log(resp);
			});
			for(var devi in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[devi]._id == d._id){
					$rootScope.current_user.devis.splice(devi,1);
					homeProvider.updateUser($rootScope.current_user,function(data){
						$rootScope.current_user = data;
					});
				}
			}
		};
		$scope.deselect = function(){
			$scope.devis = $scope.adresse = $scope.message = $scope.user  =$scope.error_message = '';
			$scope.service = '';
			$scope.messages = [];
			$scope.showSpec = false;
		};

	});



