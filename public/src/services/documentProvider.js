/**
 * Created by abdo on 2016-05-15.
 */
'use strict';


app.service('documentProvider',function(documentRepository){


	this.getDocs = function(cb){
		documentRepository.getDocs(function(data){
			return cb(data);
		});
	};

	this.createDocs = function(d,cb){
		documentRepository.createDocs(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeDocs = function(id,cb){
		documentRepository.removeDocs(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editDocs = function(id,cb){
		documentRepository.editDocs(id,function(data){

			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateDocs = function(d,cb){
		documentRepository.updateDocs(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

