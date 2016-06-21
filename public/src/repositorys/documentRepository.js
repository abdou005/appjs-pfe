/**
 * Created by abdo on 2016-05-15.
 */

'use strict';

app.service('documentRepository',function($http,$rootScope){

	this.getDocs= function(cb){
		$http({method: 'GET', url: '/Doc'}).success(function(resp){
			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	};

	this.createDocs = function(d,cb){
		console.log(d);
		$http({method: 'POST', data: d, url: '/doc', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};

	this.removeDocs = function(id,cb){
		console.log(id);
		$http.delete('/doc/' + id+'?token='+$rootScope.token_current_user).success(function(resp){
			console.log('Docs deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	};
	this.editDocs = function(id,cb){

		$http.get('/doc/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

	this.updateDocs = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http({method: 'PUT', data: d, url: '/doc', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

});


