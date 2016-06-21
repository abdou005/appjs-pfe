/**
 * Created by abdo on 2016-03-08.
 */
var fs = require('fs-extra');
var path = require('path');

function ensureExists(path, mask, cb) {
	if (typeof mask == 'function') { // allow the `mask` parameter to be optional
		cb = mask;
		mask = 0777;
	}
	fs.mkdir(path, mask, function(err) {
		if (err) {
			if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
			else cb(err); // something else went wrong
		} else cb(null); // successfully created folder
	});
};

exports.indexHome = function (req, res) {
	var returnResponse = function(collection){
		res.json(collection);
	};
	models.User.find().select('-_id -password -devis -missions -documents -avis -notifications').execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;
};

exports.index = function (req, res) {
	var returnResponse = function(collection){
		res.json(collection);
	};
	//models.User.find({}).sort({name : -1}).limit(2)select('name age lastname');
	/*models.User.findAsync()
		.then(function(collection){
			return collection.sort({name : -1}).limit(2);
		})
		.then(logLib.logContent)
		.then(returnResponse)
	;*/
	models.User.find({}).execAsync()
		//.then(logLib.logContent)
		.then(returnResponse)
	;
};
exports.one = function(req,res){
	var options = {_id:req.params.id};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.User.findOneAsync(options)
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.oneHomeEmail = function(req,res){
	var options = {email:req.params.email};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.User.findOne(options).select('-_id -password -notifications').execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.oneHomeId = function(req,res){
	var options = {_id:req.params.id};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.User.findOne(options).select('-_id -notifications').execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.create = function(req,res){
	var returnResponse = function(obj){
		var dirProfil = './public/ressources/images/users/imgProfil/'+ obj.email+'/';
		var dirDevis = './public/ressources/images/users/imgDevis/'+ obj.email+'/';
		var dirDocs = './public/ressources/images/users/documents/'+ obj.email+'/';
			ensureExists(dirProfil, 0007, function(err) {
				if (err)// handle folder creation error
					return err;
			});
			ensureExists(dirDevis, 0007, function(err) {
				if (err)// handle folder creation error
					return err;
			});
			ensureExists(dirDocs, 0007, function(err) {
				if (err)// handle folder creation error
					return err;
			});
		res.json(obj);
	};

	var returnError = function(){
		res.json({ success: false, message: 'Problem : password required or email exist' });
	};
	console.log(req.body);
	var user = new models.User(req.body);
	console.log(user);
	models.User(user).saveAsync()
		.catch(logLib.throwError)
		.then(logLib.logContent)
		.done(returnResponse,returnError)
	;
};
exports.update = function(req,res){
	var returnResponse = function(obj){
		res.json(obj);
	};
	var options = {_id:req.body._id};
	var returnUpdateObject = function(){
		models.User.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};
	delete req.body._id;
	models.User.findOneAndUpdateAsync(options, req.body)
		.then(returnUpdateObject)
	;
};
exports.addDevisNormal = function(req,res){
	var options = {_id:req.body._id};
	var devis = new models.Devis(req.body.devisNormal);
	delete req.body.devisNormal;
	console.log('Devis------------');
	console.log(devis);
	req.body.devis.push(devis);
	console.log('body------------');
	var returnResponse = function(obj){
		var dirOneDevis = './public/ressources/images/users/imgDevis/'+ obj.email+'/'+devis._id;
		ensureExists(dirOneDevis, 0007, function(err) {
			if (err)// handle folder creation error
				return err;
		});
		res.json({user :obj , devisNormal:devis});
	};
	var returnUpdateObject = function(){
		models.User.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};
	delete req.body._id;
		models.User.findOneAndUpdateAsync(options, req.body)
		.then(returnUpdateObject)
	;
};
exports.addDevisExpress = function(req,res){

	console.log(req.body);
	var options = {_id:req.body._id};
	var devis = new models.Devis(req.body.devisExpress);
	delete req.body.devisExpress;
	console.log(devis);
	req.body.devis.push(devis);
	var returnResponse = function(obj){
		var dirOneDevis = './public/ressources/images/users/imgDevis/'+ obj.email+'/'+devis._id;
		ensureExists(dirOneDevis, 0007, function(err) {
			if (err)// handle folder creation error
				return err;
		});
		res.json({user :obj , devisExpress:devis});
	};
	var returnUpdateObject = function(){
		models.User.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};
	delete req.body._id;
	models.User.findOneAndUpdateAsync(options, req.body)
		.then(returnUpdateObject)
	;
};
exports.addMissionExpress = function(req,res){

	console.log(req.body);

	var options = {_id:req.body._id};
	var mission = new models.Mission({
		name : req.body.devis.title,
		startDate : Date.now,
		state : ['inruns'],
		devis : req.body.devis
	});
	console.log('-------------');
	console.log(mission);
	console.log('-----------------');
	delete req.body.devis;
	req.body.missions.push(mission);
	console.log(req.body);
	var returnResponse = function(obj){
		res.json(obj);
	};
	var returnUpdateObject = function(){
		models.User.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};
	delete req.body._id;
	models.User.findOneAndUpdateAsync(options, req.body)
		.then(returnUpdateObject)
	;
};
exports.delete = function(req,res){
	var returnResponse = function(){
		res.json({message : 'All is fine'});
	};
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	var options = {_id:req.params.id};
	models.User.findOneAndRemoveAsync(options)
		.catch(logLib.throwError)
		.done(returnResponse,returnError)
	;
};
