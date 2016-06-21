/**
 * Created by abdo on 2016-03-09.
 */
'use strict';
app.service('homeRepository',function($http,$rootScope){

	this.getUsers = function(cb){
		$http({method: 'GET', url: '/users', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;

	};

	this.createUser = function(u,cb){
		console.log('-----user -----');
		console.log(u);
		console.log('-----user -----');
		$http({method: 'POST', data: u, url: '/users', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;

	};
	this.registerUser = function(u,cb){
		console.log(u);
		$http({method: 'POST', data: u, url: '/users/register'}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};
	this.removeUser = function(id,cb){
		$http.delete('/users/' +id+'?token='+$rootScope.token_current_user).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};
	this.editUser = function(id,cb){
		$http.get('/users/' +id+'?token='+$rootScope.token_current_user).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};
	this.editUserEmail = function(email,cb){
		$http.get('/users/homeEmail/' +email).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};
	this.editUserId = function(id,cb){
		$http.get('/users/homeId/' +id).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};
	this.updateUser = function (u,cb) {
		$http({method: 'PUT', data: u, url: '/users', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;

	};

});
