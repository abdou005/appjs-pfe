/**
 * Created by abdo on 2016-04-11.
 */

'use strict';
app
	.controller('notificationCtrl',function($scope,$rootScope,devisProvider,socketDevisFactory,homeProvider){




			socketDevisFactory.on('new-devis',function(data){
				console.log(data.service);
				for(var spec in $rootScope.current_user.specialites){
					if($rootScope.current_user.specialites[spec].name==data.service){
						console.log($rootScope.current_user.specialites[spec].name);
						homeProvider.editUser(data.devis.clientId,function(user){
							var obj = {
								user : user,
								devis : data.devis,
								path : '/recueExpress'
							};
							for(var ob in $rootScope.notificationNewDevis){
								if($rootScope.notificationNewDevis[ob].devis._id == data.devis._id){
									$rootScope.notificationNewDevis.splice(ob,1);
								}
							}
							$rootScope.notificationNewDevis.push(obj);
						});

					}
				}
			});

			socketDevisFactory.on('new-devis-quest',function(data){
				console.log(data.prestataireId);
				console.log(data.devis);
					if($rootScope.current_user._id==data.prestataireId){
						homeProvider.editUser(data.devis.clientId,function(user){
							var obj = {
								user : user,
								devis : data.devis,
								path : '/recueExpress'
							};
							for(var ob in $rootScope.notificationNewDevis){
								if($rootScope.notificationNewDevis[ob].devis._id == data.devis._id){
									$rootScope.notificationNewDevis.splice(ob,1);
								}
							}
							$rootScope.notificationNewDevis.push(obj);
						});
					}
			});

			socketDevisFactory.on('new-client',function(userClient){
				console.log(userClient,'Connect');
				for(var user in $rootScope.listeUsers ){
					console.log($rootScope.listeUsers[user]._id);
					if($rootScope.listeUsers[user]._id == userClient._id){
						$rootScope.listeUsers.splice(user,1);
					}
				}
				$rootScope.listeUsers.push(userClient);
			});

			socketDevisFactory.on('client-deco',function(userClient){
				console.log(userClient,'Deconnect');
				for(var user in $rootScope.listeUsers ){
					console.log($rootScope.listeUsers[user]._id);
					if($rootScope.listeUsers[user]._id == userClient._id){
						$rootScope.listeUsers.splice(user,1);
					}
				}
			});

	});




