/**
 * Created by abdo on 2016-04-30.
 */
'use strict';
app
	.controller('listDevisAutoCtrl',function($scope,$rootScope){


	var refrech = function(){


	};
	refrech();

})
	.controller('getDevisCtrl',function($scope,$rootScope,$routeParams,homeProvider,notificationProvider,offreProvider,socketDevisFactory,$http){


	var refrech = function(){
		$rootScope.loading = true;
		$scope.client = '';
		$scope.devis = '';
		$scope.offres = [];
		var idDevis =  $routeParams.idDevis;
		console.log(idDevis);
		homeProvider.getUsers(function(data){
			for(var u in data){
				for(var d in data[u].devis){
					if(data[u].devis[d]._id == idDevis ){
						$scope.client =data[u];
						$scope.devis = data[u].devis[d];
						console.log($scope.devis);
						$scope.offres = data[u].devis[d].offres;
					}
				}
			}
		});
		$rootScope.loading = false;

	};

	refrech();

		$scope.showFormOffre = function(){
			$scope.showFormulaireOffre = true;
		};

		$scope.createOffre = function(){
			$rootScope.loading = true;
			console.log($scope.offre);
			console.log($rootScope.current_user._id);
			var offre = {
				title : $('#title').val(),
				desc : $('#desc').val(),
				prestataireId : $rootScope.current_user._id
			};
			var str = '/'+$scope.devis._id;
			var notification = {
				message : 'Notification pour le client Il y a un offre pour votre devis de ce prestataire',
				pathDestination : str
			};
			console.log(offre);
			homeProvider.editUser($scope.client._id,function(user){
				console.log(user);
				notificationProvider.createNotif(notification,function(notif){
					console.log(notif);
					user.notifications.push(notif);
					offreProvider.createOffre(offre,function(offre){
						console.log(offre);
						for(var d in user.devis){
							if(user.devis[d]._id == $scope.devis._id){
								user.devis[d].offres.push(offre);
								$scope.devis = user.devis[d];
								console.log(user);
								homeProvider.updateUser(user,function(data){
									console.log('update Client =',data);
									$scope.offre = '';
									socketDevisFactory.emit('new-notif', data);
								});
							}
						}
						$rootScope.loading = false;
					});
				});
			});

		};

		$scope.confirmerOffre = function(id){
			$rootScope.loading = true;
			for(var devi in $rootScope.current_user.devis){
				if($rootScope.current_user.devis[devi]._id == $scope.devis._id){
					$rootScope.current_user.devis[devi].state = 'confirm';
					$rootScope.current_user.devis[devi].prestataireId = id;
					homeProvider.updateUser($rootScope.current_user,function(client){
						console.log(client);
						$rootScope.current_user = client;
					});
				}
			}
			console.log($rootScope.current_user);
			var notification = {
				message : 'Vous avez une mission en cours avec le devis',
				pathDestination : '/listMissions '
			};
			homeProvider.editUser(id,function(prestataire){
				console.log(prestataire);
				prestataire.devis  = $scope.devis;
				notificationProvider.createNotif(notification,function(notif){
					prestataire.notifications.push(notif);
					$http({method: 'PUT', data: prestataire, url: '/users/addMission', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
						console.log(resp);
						refrech();
						socketDevisFactory.emit('confirm-offre-normal',
							{
								prest : resp,
								idDevis :$scope.devis._id
							}
						);
						$rootScope.loading = false;
					});
				});
			});
		};

		$scope.getOffresPres = function(){
			$rootScope.loading = true;
			console.log($rootScope.current_user._id);
			console.log($scope.devis);
			$scope.offresPres = [];
			for(var offre in $scope.devis.offres){
				console.log($scope.devis.offres[offre]);
				if($scope.devis.offres[offre].prestataireId == $rootScope.current_user._id){
					$scope.offresPres.push($scope.devis.offres[offre]);
				}
			}
			$rootScope.loading = false;

		};

		$scope.getOffres = function(){
			$rootScope.loading = true;
			 $scope.listPrest = [];
				homeProvider.getUsers(function(data){
					for(var u in data){
						for(var o in $scope.offres){
							if(data[u]._id == $scope.offres[o].prestataireId){
								console.log(data[u]);
								console.log($scope.offres[o]);
								$scope.listPrest.push({prestataire : data[u], newOf :$scope.offres[o]});
							}
						}

					}
					$rootScope.loading = false;
				});

		};
		$scope.refrechMap= function(){
			var latlng = new google.maps.LatLng($scope.devis.adresseDevis.location[1], $scope.devis.adresseDevis.location[0]);
			var map = new google.maps.Map(document.getElementById('map'),{
				zoom : 7,
				center :latlng
			});
			var infoWindow = new google.maps.InfoWindow({map: map});
			var pos = {
				lat: $scope.devis.adresseDevis.location[1],
				lng: $scope.devis.adresseDevis.location[0]
			};
			console.log(pos);
			infoWindow.setPosition(pos);
			var  contentString =
				'<p><b>Lieu</b>: ' + $scope.devis.adresseDevis.lieu +
				'<br><b>Departement</b>: ' + $scope.devis.adresseDevis.dep +
				'<br><b>Region</b>: ' + $scope.devis.adresseDevis.region +
				'<br><b>Code Postal</b>: ' + $scope.devis.adresseDevis.codePostal +
				'</p>';
			infoWindow.setContent(contentString);
			var marker = new google.maps.Marker({
				position : latlng,
				animation: google.maps.Animation.BOUNCE,
				map : map,
				title : 'Bouger ce curseur',
				icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
				draggable : true
			});
			// Construct the circle for each value in citymap.
			var cityCircle = new google.maps.Circle({
				strokeColor: '#1ABB9C',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#1ABB9C',
				fillOpacity: 0.35,
				map: map,
				center: pos,
				radius: Math.sqrt($scope.devis.adresseDevis.InterventionArea) * 100
			});
		};
});
