/**
 * Created by abdo on 2016-04-17.
 */

'use strict';


app.service('notificationProvider',function(notificationRepository){


	this.getNotif = function(cb){
		notificationRepository.getNotif(function(data){
			return cb(data);
		});
	};

	this.createNotif = function(d,cb){
		notificationRepository.createNotif(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.removeNotif = function(id,cb){
		notificationRepository.removeNotif(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.editNotif = function(id,cb){
		notificationRepository.editNotif(id,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};

	this.updateNotif = function(d,cb){
		notificationRepository.updateNotif(d,function(data){
			console.log('data = ',data);
			return cb(data);
		});
	};
});

