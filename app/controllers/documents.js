/**
 * Created by abdo on 2016-05-15.
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

exports.index = function (req, res) {
	var returnResponse = function(collection){
		res.json(collection);
	};
	models.Document.find({}).execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;
};
exports.one = function(req,res){
	var options = {_id:req.params.id};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.Document.findOneAsync(options)
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.create = function(req,res){
	console.log(req.body.email);
	console.log('*******************************');
	console.log(req.body);
	var email = req.body.email;
	delete req.body.email;
	var returnResponse = function(obj){
		var dirOneDocs = './public/ressources/images/users/documents/'+email+'/'+obj._id;
		ensureExists(dirOneDocs, 0007, function(err) {
			if (err)// handle folder creation error
				return err;
		});
		res.json(obj);
	};
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	var doc = new models.Document(req.body);
	console.log('*******************************');
	console.log(doc);

	models.Document(doc).saveAsync()
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

	console.log(req.body);
	var returnUpdateObject = function(){
		models.Document.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};

	delete req.body._id;
	models.Document.findOneAndUpdateAsync(options, req.body)
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
	models.Document.findOneAndRemoveAsync(options)
		.catch(logLib.throwError)
		.done(returnResponse,returnError)
	;

};

