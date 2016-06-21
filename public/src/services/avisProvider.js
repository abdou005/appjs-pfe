/**
 * Created by abdo on 2016-05-09.
 */
'use strict';


app.service('avisProvider',function(avisRepository){


	this.getAvis = function(cb){
		avisRepository.getAvis(function(data){
			return cb(data);
		});
	};

	this.createAvis = function(d,cb){
		avisRepository.createAvis(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeAvis = function(id,cb){
		avisRepository.removeAvis(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editAvis = function(id,cb){
		avisRepository.editAvis(id,function(data){

			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateAvis = function(d,cb){
		avisRepository.updateAvis(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

