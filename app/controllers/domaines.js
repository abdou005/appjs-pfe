/**
 * Created by abdo on 2016-03-12.
 */

exports.test = function(req,res){

	console.log('cookies = ',req.cookies);
	console.log("----------------------------");
	console.log('session ID = ',req.session.id);
	res.status(500).send('session id = ',req.session.id);
};
exports.index = function (req, res) {
	var returnResponse = function(collection){
		res.json(collection);
	};
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
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	models.Domaine.findOneAsync(options)
		.then(logLib.logContent)
		.done(returnResponse,returnError)
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
	var specialites = req.body.specialites;
	delete req.body.tags;
	delete req.body.specialites;
	var dom = new models.Domaine(req.body);
	for(var t in tags){
		var tag = new models.Tag(tags[t]);
		dom.tags.push(tag);
	}
	for(var s in specialites){
		var spec = new models.Specialite(specialites[s]);
		dom.specialites.push(spec);
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

	console.log(req.body);
	var returnUpdateObject = function(){
		models.Domaine.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};

	delete req.body._id;
	models.Domaine.findOneAndUpdateAsync(options, req.body)
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
	models.Domaine.findOneAndRemoveAsync(options)
		.catch(logLib.throwError)
		.done(returnResponse,returnError)
	;

};

