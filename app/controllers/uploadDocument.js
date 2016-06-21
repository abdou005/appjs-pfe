/**
 * Created by abdo on 2016-05-16.
 */
var fs = require('fs-extra');
var path = require('path');

exports.uploadDocs = function (req, res){
	console.log('--------Debut*******************************----------');
	var file = req.files.file;
	var userEmail = req.body.email;
	var userId = req.body.idUser;
	var docId = req.body.idDocs;
	console.log('-----body');
	console.log(req.body);

	console.log('-----Information');
	console.log("User  = " + userEmail +"in DocId = "+docId +" is submitting  = " , file.name);

	var tempPath = file.path;
	console.log('--------Temp path-----------');
	console.log(tempPath);
	console.log('-------------------');

	var targetPath = path.join(__dirname, "../../public/ressources/images/users/documents/" + userEmail+ "/"+docId+"/"+file.name);
	console.log('--------Target Path----------');
	console.log(targetPath);
	console.log('-------------------');

	var savePath = "/ressources/images/users/documents/" + userEmail+ "/"+docId+"/"+file.name;
	console.log('--------Save Path----------');
	console.log(savePath);
	console.log('-------------------');

	console.log('--------Fin**************************************----------');

	fs.move(tempPath, targetPath, function (err){
		if (err){
			console.log(err)
		} else {

			models.User.findById(userId, function(err, userData){
				var user = userData;
				console.log('----User avant Document----');
				console.log(user);
				console.log('--------');
				for(var d in user.documents){

					if(user.documents[d]._id == docId){
						console.log('Docs a remplir ');
						console.log(user.documents[d]);
						user.documents[d].urlDoc = savePath;
						user.documents[d].name = file.name;
						console.log('Docs apres remplir ');
						console.log(user.documents[d]);
						console.log('-------------- ');
						var returnResponse = function(obj){
							console.log('obje return = ');
							console.log(obj);
							console.log('----------------- ');
							res.json({user : obj , mediaDocs : user.documents[d]});
						};
						var options = {_id:userId};
						var returnUpdateObject = function(){
							models.User.findOneAsync(options)
								.then(logLib.logContent)
								.then(returnResponse)
							;
						};
						delete  user._id;
						models.User.findOneAndUpdateAsync(options, user)
							.then(returnUpdateObject)
						;

					}
				}
			});

		}
	});
};

exports.removeDocs = function (req, res){
	console.log('--------Debut*******************************----------');
	var devisId = req.params.id;
	var emailUser = req.query.email;

	var targetPath = path.join(__dirname, "../../public/ressources/images/users/documents/"+emailUser+"/"+devisId);
	console.log('--------Target Path----------');
	console.log(targetPath);
	console.log('-------------------');
	console.log('--------Fin**************************************----------');
	fs.remove(targetPath, function (err) {
		if (err) return console.error(err);

		console.log('success!');
		res.json({fileRemove :'success' });
	});
};
