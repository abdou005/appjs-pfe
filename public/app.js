/**
 * Created by abdo on 2016-02-11.
 */
'use strict';
var app = angular.module('myApp',['ngRoute','btford.socket-io','geolocation','ngFileUpload']);
app.run(function($rootScope, $http,$location,socketDevisFactory) {
	$rootScope.loading = false;
	$rootScope.showHome = true;
	$rootScope.showSearchPrest = false;
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	$rootScope.isSuperAdmin = false;
	$rootScope.isAdmin = false;
	$rootScope.isClient = false;
	$rootScope.isArtisan = false;
	$rootScope.isProfil = false;
	$rootScope.token_current_user = '';
	$rootScope.listeUsers = [];
	$rootScope.notificationNewDevis = [];

	$rootScope.signout = function () {
		$http.delete('auth/signout?token='+$rootScope.token_current_user).success(function (resp) {
			console.log(resp);
		});

		$rootScope.isAdmin = false;
		$rootScope.isClient = false;
		$rootScope.isArtisan = false;
		$rootScope.isProfil = false;
		$rootScope.authenticated = false;
		$rootScope.current_user = '';
		$rootScope.token_current_user = '';
		$rootScope.listeUsers = [];
		$rootScope.notificationNewDevis = [];
		$location.path('/');
	};

	$rootScope.disponible = function(){
		if($rootScope.isSuperAdmin) return false;

		if($rootScope.current_user.dispo){
			$rootScope.current_user.dispo = false;
		}else{
			$rootScope.current_user.dispo = true;
		}
		$http({method: 'PUT', data: $rootScope.current_user, url: '/users', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			$rootScope.current_user = resp;
			socketDevisFactory.emit('new-client',$rootScope.current_user);
		});
	};
});
