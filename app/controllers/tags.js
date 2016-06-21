/**
 * Created by abdo on 2016-03-13.
 */

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
	models.Domaine.find({}).execAsync()
		.then(logLib.logContent)
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
exports.create = function(req,res){
	var returnResponse = function(obj){
		res.json(obj);
	};
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	var tags = req.body.tags;
	delete req.body.tags;
	var dom = new models.Domaine(req.body);
	for(var t in tags){
		var tag = new models.Tag(tags[t]);
		dom.tags.push(tag);
	}
	models.Domaine(dom).saveAsync()
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


