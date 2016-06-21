/**
 * Created by abdo on 2016-05-19.
 */
'use strict';
app
	.controller('getPrestataireCtrl',function($scope,homeProvider,contentProvider,$http,$rootScope,$location){
		var refrech = function(){
			$rootScope.loading = true;
			$scope.user = '';
			$scope.users = [];
			$scope.adresses = [];
			$scope.services = [];
			$scope.showAdresse = false;
			$scope.showService = false;
			$scope.adresse = '';
			$http({method: 'GET', url: '/users/home'}).success(function(resp){
				console.log(resp);
				$scope.users = resp;
				for(var u in resp){
					if(resp[u].typeUser == 'artisan'){
						for(var adr in resp[u].adresses){
							$scope.adresses.push(resp[u].adresses[adr]);
						}
					}
				}
				contentProvider.getDomaines(function(data){
					for(var d in data){
						for(var s in data[d].specialites){
							console.log(data[d].specialites[s]);
							$scope.services.push(data[d].specialites[s]);
						}
					}
					$rootScope.loading = false;
					console.log($scope.services);
				});

			});
		};
		refrech();
		$scope.getService = function(){
			$rootScope.showHome = true;
			$scope.showService = true;
		};
		$scope.getAdresse = function(){
			$rootScope.showHome = true;
			$scope.showAdresse = true;
		};
		$scope.getValServ = function(s){
			console.log(s);
			$scope.user.service = s;
			$scope.showService = false;
		};
		$scope.getValAdr = function(adr){
			$scope.adresse = adr.lieu;
			var str = adr.lieu+', '+adr.codePostal;
			$scope.user.adresse = str;
			$scope.showAdresse = false;
		};

		$scope.searchPrestataire = function(){
			$rootScope.loading = true;
			console.log($scope.user.service);
			console.log($scope.adresse);
			$scope.listPrestataires = [];
			$http({method: 'GET', url: '/users/home'}).success(function(resp){
				console.log(resp);
				for(var u in resp){
					var resAdr = false;
					var resServ = false;
					for(var s in resp[u].specialites){
						if(resp[u].specialites[s].name == $scope.user.service){
							resServ = true;
						}
					}
					for(var adr in resp[u].adresses){
						if( resp[u].adresses[adr].lieu == $scope.adresse){
							resAdr = true;
						}
					}
					if(resServ & resAdr){
						$rootScope.showHome = false;
						$rootScope.showSearchPrest = true;
						console.log('trouve');
						$scope.listPrestataires.push(resp[u]);

					}
				}
				$rootScope.loading = false;
				$scope.user = '';
			});
		};
		$scope.getHome = function(){
			$rootScope.showHome = true;
			$rootScope.showSearchPrest = false;
			$scope.typePrest = '';
		};
		$scope.getPagePro = function(email){
			$rootScope.loading = true;
			//$scope.showAvisPro = false;
			/*var avisPro = {
				avis : '',
				client : ''
			};*/
			console.log(email);
			homeProvider.editUserEmail(email,function(data){
				console.log('ok existe = ',data);
				$scope.prestPagePro = data;
				for(var m in data.missions){
					if(data.missions[m].avis != null){
						$scope.prestPagePro.avis.push(data.missions[m].avis);
						/*homeProvider.editUserId(data.missions[m].avis.clientId,function(client){
							console.log(client.email);
							avisPro.avisClient =  data.missions[m].avis;
							avisPro.client = client;
							$scope.prestPagePro.avis.push(avisPro);

						});*/
					}
				}
				$rootScope.loading = false;
			});
		};
		$scope.refrechMap = function(){
				var lat = 35.83114520896535;
				var long = 10.589864988571208;
				var pos = {
					lat: lat,
					lng: long
				};
				for(var a in $rootScope.current_user.adresses ) {
					if($rootScope.current_user.adresses[a].isDefault){
						pos = {
							lat: $rootScope.current_user.adresses[a].location[1],
							lng: $rootScope.current_user.adresses[a].location[0]
						};
						console.log(pos);
					}
				}
				var latlng = new google.maps.LatLng(pos.lat, pos.lng);
				// Create Map
				var map = new google.maps.Map(document.getElementById('map'),{
					zoom : 8,
					center :latlng
				});
					var markerGlobb = new google.maps.Marker({
						position : latlng,
						animation: google.maps.Animation.BOUNCE,
						map : map,
						title : 'Bouger ce curseur',
						icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
						draggable : true
					});
				console.log(map);
				for(var a in $rootScope.current_user.adresses){
					console.log($rootScope.current_user.adresses[a].location);
					var latlng1 = new google.maps.LatLng($rootScope.current_user.adresses[a].location[1], $rootScope.current_user.adresses[a].location[0]);
					var marker  = new google.maps.Marker({
						position : latlng1,
						map : map
					});
					var center = {lat : $rootScope.current_user.adresses[a].location[1], lng:$rootScope.current_user.adresses[a].location[0]};
					console.log(center);
					// Construct the circle for each value in citymap.
					var cityCircle = new google.maps.Circle({
						strokeColor: '#1ABB9C',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#1ABB9C',
						fillOpacity: 0.35,
						map: map,
						center: center,
						radius: Math.sqrt($rootScope.current_user.adresses[a].InterventionArea) * 100
					});
				}
		};

	});

/* .controller('searchPrestataireCtrl',function($rootScope,$scope,$http,$location){
	 	var refrech = function(){
			$rootScope.showHome = false;
			$scope.listPrestataires = [];
			var listUsers = [];
			$http({method: 'GET', url: '/users/home'}).success(function(resp){
				console.log(resp);
				for(var u in resp){
					var resAdr = false;
					var resServ = false;
					for(var s in resp[u].specialites){
						if(resp[u].specialites[s].name == $rootScope.searchServ){
							resServ = true;
						}
					}
					for(var adr in resp[u].adresses){
						if( resp[u].adresses[adr].lieu == $rootScope.searchAdr){
							resAdr = true;
						}
					}
					if(resServ & resAdr){
						console.log('trouve');
						listUsers.push(resp[u]);
					}

				}
				$scope.listPrestataires = listUsers;

			});
		};
		refrech();

		$scope.getHome = function(){
			$rootScope.showHome = true;
			$location.path('/');
		};

	})
*/