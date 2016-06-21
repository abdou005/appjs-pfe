/**
 * Created by abdo on 2016-05-09.
 */

'use strict';

app.service('avisRepository',function($http,$rootScope){

	this.getAvis= function(cb){
		$http({method: 'GET', url: '/avis'}).success(function(resp){
			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	}

	this.createAvis = function(d,cb){
		console.log(d);
		$http({method: 'POST', data: d, url: '/avis', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	}

	this.removeAvis = function(id,cb){
		console.log(id);
		$http.delete('/avis/' + id+'?token='+$rootScope.token_current_user).success(function(resp){
			console.log('Avis deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	}
	this.editAvis = function(id,cb){

		$http.get('/avis/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	}

	this.updateAvis = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http({method: 'PUT', data: d, url: '/avis', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	}

});

