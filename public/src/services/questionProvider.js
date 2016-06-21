/**
 * Created by abdo on 2016-04-17.
 */

'use strict';


app.service('questionProvider',function(questionRepository){


	this.getQuestion = function(cb){
		questionRepository.getQuestion(function(data){
			return cb(data);
		});
	};

	this.createQuestion = function(d,cb){
		questionRepository.createQuestion(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeQuestion = function(id,cb){
		questionRepository.removeQuestion(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editQuestion = function(id,cb){
		questionRepository.editQuestion(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateQuestion = function(d,cb){
		questionRepository.updateQuestion(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

