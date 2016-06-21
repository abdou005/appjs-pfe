/**
 * Created by abdo on 2016-04-17.
 */
'use strict';

app.service('questionRepository',function($http){

	this.getQuestion = function(cb){
		$http.get('/questions').success(function(resp){
			console.log('i got the data I request');

			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	};

	this.createQuestion = function(d,cb){
		console.log(d);
		$http.post('/questions',d).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};

	this.removeQuestion = function(id,cb){
		console.log(id);
		$http.delete('/questions/' + id).success(function(resp){
			console.log('devis deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	};
	this.editQuestion = function(id,cb){

		$http.get('/questions/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

	this.updateQuestion = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http.put('/questions/',d).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

});
