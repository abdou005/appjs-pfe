/**
 * Created by abdo on 2016-04-17.
 */

exports.index = function (req, res) {
	var returnResponse = function(collection){
		res.json(collection);
	};
	models.Notification.find({}).execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;
};
exports.one = function(req,res){
	var options = {_id:req.params.id};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.Notification.findOneAsync(options)
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.create = function(req,res){
	var returnResponse = function(obj){
		res.json(obj);
	};
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	var offre = new models.Notification(req.body);
	models.Notification(offre).saveAsync()
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
		models.Notification.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};

	delete req.body._id;
	models.Notification.findOneAndUpdateAsync(options, req.body)
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
	models.Notification.findOneAndRemoveAsync(options)
		.catch(logLib.throwError)
		.done(returnResponse,returnError)
	;

};


