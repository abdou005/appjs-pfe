/**
 * Created by abdo on 2016-04-17.
 */
'use strict';
app
	.controller('notificationUserCtrl',function($scope,$rootScope,socketDevisFactory,notificationProvider,$location,homeProvider){

		var refrech = function(){
			$rootScope.loading = true;
			homeProvider.editUser($rootScope.current_user._id ,function(data){
				$rootScope.current_user = data;
				$rootScope.loading = false;
			});
		};
		//refrech();
		socketDevisFactory.on('new-notif',function(userNotif){
			console.log('notification pour ',userNotif);
			refrech();
			if($rootScope.current_user._id == userNotif.prest._id){
				if(typeof  userNotif.devis.clientId == 'undefined'){
					console.log('No I Devis');
					return false;
				}else{
					homeProvider.editUser(userNotif.devis.clientId,function(user){
						var obj = {
							user : user,
							devis : userNotif.devis,
							path : '/recueExpress'
						};
						for(var ob in $rootScope.notificationNewDevis){
							if($rootScope.notificationNewDevis[ob].devis._id == userNotif.devis._id){
								$rootScope.notificationNewDevis.splice(ob,1);
							}
						}
						$rootScope.notificationNewDevis.push(obj);
					});
				}
			}

		});
		socketDevisFactory.on('confirm-offre',function(userNotif){
			console.log('notification pour ',userNotif);
				refrech();
				homeProvider.editUser(userNotif.devis.clientId,function(user){
					var obj = {
						user : user,
						devis : userNotif.devis,
						path : '/recueExpress'
					};
					for(var ob in $rootScope.notificationNewDevis){
						if($rootScope.notificationNewDevis[ob].devis._id == userNotif.devis._id){
							$rootScope.notificationNewDevis.splice(ob,1);
						}
					}
					$rootScope.notificationNewDevis.push(obj);
				});
		});
		socketDevisFactory.on('confirm-offre-normal',function(data){
			console.log('notification pour ',data);
			if($rootScope.current_user._id == data.prest._id){
				refrech();
				var str = '/'+$scope.devis._id;
				$location.path(str);
			}
		});
		/*socketDevisFactory.on('new-doc-prest',function(adminId){
			console.log('notification pour l admin  ',adminId);
			if($rootScope.current_user.typeUser[0] == 'admin'){
				refrech();
			}
		});*/
		socketDevisFactory.on('notifDoc-prestataire',function(userIdNotif){
			console.log('notification pour user Id ',userIdNotif);
			if($rootScope.current_user._id == userIdNotif){
					homeProvider.editUser(userIdNotif,function(user){
						$rootScope.current_user = user
					});
			}
		});

		$scope.deleteNotification = function(notif){
			$rootScope.loading = true;
			console.log(notif);
			homeProvider.editUser($rootScope.current_user._id ,function(data){
				for(var n in data.notifications){
					if(data.notifications[n]._id == notif._id){
						data.notifications.splice(n,1);
						homeProvider.updateUser(data ,function(user){
							$rootScope.current_user = user;
							$rootScope.loading = false;
						});
					}
				}
			});
		};

		$scope.clearAllNotif = function(){
			$rootScope.loading = true;
			homeProvider.editUser($rootScope.current_user._id ,function(data){
				data.notifications = [];
					homeProvider.updateUser(data ,function(user){
						$rootScope.current_user = user;
						$rootScope.loading = false;
					});
			});
		};

	});

