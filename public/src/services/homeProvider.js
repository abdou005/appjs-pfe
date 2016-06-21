/**
 * Created by abdo on 2016-03-09.
 */
'use strict';
app
	.service('homeProvider',function(homeRepository){

		this.getUsers = function(cb){
			homeRepository.getUsers(function(data){
				return cb(data);
			});
		};

		this.createUser = function(u,cb){
			homeRepository.createUser(u,function(data){
				console.log(data);
				return cb(data);
			});

		};
		this.registerUser = function(u,cb){
			console.log(u);
			homeRepository.registerUser(u,function(data){
				console.log(data);
				return cb(data);
			});

		};
		this.removeUser = function(id,cb){
			homeRepository.removeUser(id,function(data){
				console.log(data);
				return cb(data);
			});
		};

		this.editUser = function(id,cb){
			homeRepository.editUser(id,function(data){
				console.log(data);
				return cb(data);
			});
		};

		this.editUserEmail = function(id,cb){
			homeRepository.editUserEmail(id,function(data){
				console.log(data);
				return cb(data);
			});
		};
		this.editUserId = function(id,cb){
			homeRepository.editUserId(id,function(data){
				console.log(data);
				return cb(data);
			});
		};
		this.updateUser = function(u,cb){
			homeRepository.updateUser(u,function(data){
				console.log(data);
				return cb(data);
			});
		};

});
