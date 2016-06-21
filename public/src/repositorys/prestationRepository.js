/**
 * Created by abdo on 2016-06-09.
 */
'use strict';
app.service('prestationRepository',function($http){

	this.getQuestion = function(cb){
		$http.get('/prestation').success(function(resp){
			console.log('i got the data I request');

			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	};

	this.createQuestion = function(d,cb){
		console.log(d);
		$http.post('/prestation',d).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};

	this.removeQuestion = function(id,cb){
		console.log(id);
		$http.delete('/prestation/' + id).success(function(resp){
			console.log('devis deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	};
	this.editQuestion = function(id,cb){

		$http.get('/prestation/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

	this.updateQuestion = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http.put('/prestation/',d).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

});
