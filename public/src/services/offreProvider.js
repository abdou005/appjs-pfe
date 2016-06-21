/**
 * Created by abdo on 2016-04-17.
 */

'use strict';


app.service('offreProvider',function(offreRepository){


	this.getOffre = function(cb){
		offreRepository.getOffre(function(data){
			return cb(data);
		});
	};

	this.createOffre = function(d,cb){
		offreRepository.createOffre(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeOffre = function(id,cb){
		offreRepository.removeOffre(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editOffre = function(id,cb){
		offreRepository.editOffre(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateOffre = function(d,cb){
		offreRepository.updateOffre(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

