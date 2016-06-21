/**
 * Created by abdo on 2016-04-17.
 */
'use strict';

app.service('notificationRepository',function($http){

	this.getNotif = function(cb){
		$http.get('/notifications').success(function(resp){
			console.log('i got the data I request');

			console.log("resp = ",resp);
			return cb(resp);
		});
		return false;
	};

	this.createNotif = function(d,cb){
		console.log(d);
		$http.post('/notifications',d).success(function(resp){
			console.log(resp);
			return cb(resp);
		});
		return false;
	};

	this.removeNotif = function(id,cb){
		console.log(id);
		$http.delete('/notifications/' + id).success(function(resp){
			console.log('devis deleted = ',resp);
			console.log(resp);
			return cb(resp);

		});
		return false;
	};
	this.editNotif = function(id,cb){

		$http.get('/notifications/'+id).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

	this.updateNotif = function(d,cb){
		console.log('Id Object et Object = ',d);
		$http.put('/notifications/',d).success(function(resp){
			console.log('resp = ',resp);
			return cb(resp);
		});
		return false;
	};

});
