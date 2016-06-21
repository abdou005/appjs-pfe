/**
 * Created by abdo on 2016-03-08.
 */
'use strict';
app
	.controller('homeCtrl',function($scope,homeProvider,$rootScope){
		var refrech = function(){
			$rootScope.loading = true;
			$scope.showConfirmLogin = $scope.showErrorLogin = false;
			homeProvider.getUsers(function(data){
				$scope.users = data;
				$scope.user= '';
				$rootScope.loading = false;

			});
		};
		refrech();
		$scope.createUser = function(){
			$rootScope.loading = true;
			$scope.user.statut = 'actif';
				homeProvider.createUser($scope.user,function(data){
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
		$scope.removeUser = function(id){
			console.log(id);
			homeProvider.removeUser(id,function(data){
				console.log(data);
			});
			refrech();
		};
		$scope.editUser = function(id){
			console.log(id);
			homeProvider.editUser(id,function(data){
				console.log(data);
				$scope.user = data;
			});
		};
		$scope.updateUser = function(){
			if($scope.user == ''){
				console.log('user null');
			}else{
				homeProvider.updateUser($scope.user,function(data){
					console.log(data);
					refrech();
					$scope.user = data;
				});
			}
		};
		$scope.deselect = function(){
			$scope.user = '';
		};

	})
	.controller('confirmUserCtrl',function($scope,$rootScope,homeProvider,socketDevisFactory,documentProvider,$http,notificationProvider){
		var refrech = function(){
			$scope.showuser = false;
			$scope.showDocs = false;
			homeProvider.getUsers(function(data){
				$scope.users = data;
				$scope.user= '';
			});

		};
		refrech();
		$scope.getPrestataire = function(id){
			$scope.showuser = true;
			console.log(id);
			homeProvider.editUser(id,function(data){
				console.log(data);
				$scope.user = data;
			});
		};
		$scope.isActive = function(conf){
			if(conf){
				return 'success';
			}else{
				return 'danger';
			}

		};
		$scope.isActiveDocs = function(state){
			if(state){
				return 'success';
			}else{
				return 'danger';
			}

		};
		$scope.showFormDocs = function(){
			$scope.showDocs = true;
		};
		$scope.createDocs = function(){
			console.log($scope.document);
			$scope.document.email = $scope.user.email;
			console.log($scope.document);
			documentProvider.createDocs($scope.document,function(doc){
				console.log(doc);
				console.log($scope.user);
				$scope.user.documents.push(doc);
					var notification = {
						message : 'Vous devez ajouter votre '+$scope.document.type+' pour terminer votre inscription',
						pathDestination : '/profilArtisan'
					};
				notificationProvider.createNotif(notification,function(notif){
					$scope.user.notifications.push(notif);
						homeProvider.updateUser($scope.user,function(data){
							console.log(data);
							$scope.user = data;
							socketDevisFactory.emit('notifDoc-prestataire',data._id);
							$scope.document = '';

						});

				});

			});

		};
		$scope.editDocs = function(id){
			documentProvider.editDocs(id,function(data){
				$scope.document = data;
			});

		};
		$scope.removeDocs = function(id){
			$http.delete('/document/removeDoc/' +id+'?token='+$rootScope.token_current_user+'&email='+$scope.user.email).success(function(resp){
				console.log(resp);
			});
			homeProvider.editUser($scope.user._id,function(prest){
				for(var doc in prest.documents){
					if(prest.documents[doc]._id == id){
						console.log('Documents trouver ',prest.documents[doc]);
						var notification = {
							message : 'Administrateur a supprimer  '+prest.documents[doc].type+' verifier vos autres documents',
							pathDestination : '/profilArtisan'
						};
						prest.documents.splice(doc,1);
						notificationProvider.createNotif(notification,function(notif){
							prest.notifications.push(notif);
							homeProvider.updateUser(prest,function(data){
								console.log(data);
								$scope.user = data;
								socketDevisFactory.emit('notifDoc-prestataire',data._id);
								$scope.document = '';

							});

						});
					}
				}

			});
		};
		$scope.confirmeDocs = function(document){
			console.log(document);
			homeProvider.editUser($scope.user._id,function(prest){
				for(var doc in prest.documents){
					if(prest.documents[doc]._id == document._id){
						console.log('Documents trouver ',prest.documents[doc]);
						var notification = {
							message : 'Administrateur a Confirmer votre Document  '+document.type+'..',
							pathDestination : '/profilArtisan'
						};
						prest.documents[doc].state = true;
						notificationProvider.createNotif(notification,function(notif){
							prest.notifications.push(notif);
							homeProvider.updateUser(prest,function(data){
								console.log(data);
								$scope.user = data;
								socketDevisFactory.emit('notifDoc-prestataire',data._id);
							});
						});
					}
				}
			});
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
		$scope.getDocAdd = function(docs){
			var nbr =0;
			for(var d in docs){
				if(docs[d].urlDoc != null){
					nbr++;
				}
			}
			return nbr;
		};
		$scope.confirmeUser = function(u){
			homeProvider.editUser(u._id,function(prest){
				var notification = {
					message : 'Administrateur a Confirmer votre Compte vous pouvez commencer',
					pathDestination : '/profilArtisan'
				};
				prest.confirmer = true;
				notificationProvider.createNotif(notification,function(notif){
					prest.notifications.push(notif);
					homeProvider.updateUser(prest,function(data){
						console.log(data);
						$scope.user = data;
						socketDevisFactory.emit('notifDoc-prestataire',data._id);
						refrech();
					});
				});

			});
		};
		$scope.deselect = function(){
			$scope.document = '';

		};
	});