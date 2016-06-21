/**
 * Created by abdo on 2016-06-09.
 */

'use strict';


app.service('prestationProvider',function(prestationRepository){


	this.getQuestion = function(cb){
		prestationRepository.getQuestion(function(data){
			return cb(data);
		});
	};

	this.createQuestion = function(d,cb){
		prestationRepository.createQuestion(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeQuestion = function(id,cb){
		prestationRepository.removeQuestion(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editQuestion = function(id,cb){
		prestationRepository.editQuestion(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateQuestion = function(d,cb){
		prestationRepository.updateQuestion(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

