/**
 * Created by abdo on 2016-04-11.
 */

'use strict';
app
	.controller('adresseCtrl',function($scope,$http,$rootScope,homeProvider){

		// Set initial coordinates map
		var lat = 35.83114520896535;
		var long = 10.589864988571208;
		var pos = {
			lat: lat,
			lng: long
		};
		var latlng = new google.maps.LatLng(pos.lat, pos.lng);
		// Create Map
		var map = new google.maps.Map(document.getElementById('map'),{
			zoom : 8,
			center :latlng
		});
		// Create Marker and set position

		///////////////////// Geolocation
		var infoWindow = new google.maps.InfoWindow({map: map});
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				console.log(pos);
				infoWindow.setPosition(pos);
				var latlnggeo = new google.maps.LatLng(pos.lat, pos.lng);
				var marker = new google.maps.Marker({
					position : latlnggeo,
					animation: google.maps.Animation.BOUNCE,
					map : map,
					title : 'Bouger ce curseur',
					icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
					draggable : true
				});
				infoWindow.setContent('Location found.');
				map.setCenter(pos);
				setPosition(marker);
				//geocoder position map
				var geocoder = new google.maps.Geocoder();
				//get location with geocoder and update marker position

				$scope.getLocation= function(){
					console.log($scope.adresse.lieu);
					var request = {
						address : $scope.adresse.lieu
					};
					geocoder.geocode(request,function(results,status){
						console.log(status);
						if(status == google.maps.GeocoderStatus.OK){
							var pos = results[0].geometry.location;
							map.setCenter(pos);
							marker.setPosition(pos);
							marker.setAnimation(google.maps.Animation.BOUNCE);
							setPosition(marker);
						}

					});
					return false;
				};

				google.maps.event.addListener(marker,'drag',function(){
					setPosition(marker);
				});


				///////////////update marker position
				function setPosition(marker){
					var pos = marker.getPosition();
					$('#latitude').val(pos.lat);
					$('#longitude').val(pos.lng);
				};
				///////////////update marker position


			}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		}else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
//////////////////////////////////////////////////////////////////////////////////////////////////
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
				'Error: The Geolocation service failed.' :
				'Error: Your browser doesn\'t support geolocation.');
		}
/////////////////////////////////////////////////////////////////////////////////////////////////
		var refrech = function(){
			$scope.message = $scope.error_message = 'message Request';
			$scope.adresse = '';
		};
		refrech();
		var setMarkers  = function(){
			for(var a in $rootScope.current_user.adresses ){
				console.log($rootScope.current_user.adresses[a].location);
				var latlng = new google.maps.LatLng($rootScope.current_user.adresses[a].location[1], $rootScope.current_user.adresses[a].location[0]);
				var marker  = new google.maps.Marker({
					position : latlng,
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
		setMarkers();
		// ----------------------------------------------------------------------------
		// Creates a new adresse based on the form fields
		$scope.createAdresse = function() {
			// Grabs all of the text box fields
			var adresseData = {
				lieu: $scope.adresse.lieu,
				dep: $scope.adresse.dep,
				region: $scope.adresse.region,
				codePostal: $scope.adresse.codePostal,
				location: [$('#longitude').val(), $('#latitude').val()],
				InterventionArea :$scope.adresse.InterventionArea
			};
			console.log(adresseData);
			console.log($rootScope.current_user);
			$rootScope.current_user.adresses.push(adresseData);
			console.log($rootScope.current_user);
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				refrech();
				setMarkers();
			});
		};
		$scope.removeAdresse = function(a){
			for(var adr in $rootScope.current_user.adresses ){
				if($rootScope.current_user.adresses[adr]._id == a._id){
					$rootScope.current_user.adresses.splice(adr,1);
				}
			}
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				refrech();
				setMarkers();
			});

		};
		$scope.setDefault = function(a){
			for(var adr in $rootScope.current_user.adresses ){
				$rootScope.current_user.adresses[adr].isDefault = false;
				if($rootScope.current_user.adresses[adr]._id == a._id){
					$rootScope.current_user.adresses[adr].isDefault = true;
				}
			}
			homeProvider.updateUser($rootScope.current_user,function(data){
				console.log(data);
				$rootScope.current_user = data;
				refrech();
				setMarkers();
			});
		};
	});




