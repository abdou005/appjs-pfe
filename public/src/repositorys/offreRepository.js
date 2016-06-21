/**
 * Created by abdo on 2016-04-17.
 */
'use strict';

app.service('offreRepository',function($http){

	this.getOffre = function(cb){
		$http.get('/offres').success(function(resp){
			console.log('i got the data I request');

			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	};

	this.createOffre = function(d,cb){
		console.log(d);
		$http.post('/offres',d).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};

	this.removeOffre = function(id,cb){
		console.log(id);
		$http.delete('/offres/' + id).success(function(resp){
			console.log('devis deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	};
	this.editOffre = function(id,cb){

		$http.get('/offres/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

	this.updateOffre = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http.put('/offres/',d).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

});
