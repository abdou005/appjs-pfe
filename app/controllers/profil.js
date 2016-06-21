var fs = require('fs-extra');
var path = require('path');

exports.uploadAvatar = function (req, res){
    var file = req.files.file;
    var userEmail = req.body.email;
    var userId = req.body._id;
    console.log('-----body');
    console.log(req.body);
    console.log('-----');
    console.log(userId);
    console.log("User " + req.body.email + " is submitting " , file.name);
    //var uploadDate = new Date();
    var tempPath = file.path;
    console.log('--------Temp path-----------');
    console.log(tempPath);
    console.log('-------------------');

    var targetPath = path.join(__dirname, "../../public/ressources/images/users/imgProfil/" + userEmail+ "/"+file.name);
    console.log('--------Target Path----------');
    console.log(targetPath);
        console.log('-------------------');
    var savePath = "/ressources/images/users/imgProfil/" + userEmail+ "/"+file.name;
    fs.move(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            
           models.User.findById(userId, function(err, userData){
                    var user = userData;
                    var media = new models.Media(
                            {
                            urlMedia : savePath,
                            name : file.name
                            }
                    );
                        console.log('----Medias-----');
                        console.log(media);
                        console.log('------------------');
                             user.mediaProfil = media;
                             user.medias.push(media);

                       console.log('--------');
                       console.log(user);
                       console.log('--------');
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
                        delete  user._id;
                        models.User.findOneAndUpdateAsync(options, user)
                            .then(returnUpdateObject)
                        ;
            });

        }
    });
};
exports.removeAvatar = function (req, res){
    console.log('--------Debut*******************************----------');
    var urlMedia = req.query.urlMedia;

    var targetPath = path.join(__dirname, "../../public"+urlMedia);
    console.log('--------Target Path----------');
    console.log(targetPath);
    console.log('-------------------');
    console.log('--------Fin**************************************----------');
    fs.remove(targetPath, function (err) {
        if (err) return console.error(err)

        console.log('success!');
        res.json({fileRemove :'success' });
    });
};

exports.uploadImageDevis = function (req, res){
    console.log('--------Debut*******************************----------');
    var file = req.files.file;
    var userEmail = req.body.user.email;
    var userId = req.body.user._id;
    var devisId = req.body.devis._id;
    console.log('-----body');
    console.log(req.body);

    console.log('-----User');
    console.log(req.body.user);

    console.log('-----Devis');
    console.log(req.body.devis);

    console.log('-----Information');
    console.log("User  = " + req.body.user.email +"in devisId = "+req.body.devis._id +" is submitting  = " , file.name);

    var tempPath = file.path;
    console.log('--------Temp path-----------');
    console.log(tempPath);
    console.log('-------------------');

    var targetPath = path.join(__dirname, "../../public/ressources/images/users/imgDevis/" + userEmail+ "/"+req.body.devis._id+"/"+file.name);
     console.log('--------Target Path----------');
     console.log(targetPath);
     console.log('-------------------');

     var savePath = "/ressources/images/users/imgDevis/" + userEmail+ "/"+req.body.devis._id+"/"+file.name;
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
                console.log('----User avant medias----');
                console.log(user);
                console.log('--------');
                var media = new models.Media(
                    {
                        urlMedia : savePath,
                        name : file.name
                    }
                );
                console.log('----Medias-----');
                console.log(media);
                console.log('------------------');
                for(var d in user.devis){

                    if(user.devis[d]._id == devisId){
                        console.log('devis a remplir ');
                        console.log(user.devis[d]);
                        user.devis[d].medias.push(media);
                        console.log('devis apres remplir ');
                        console.log(user.devis[d]);
                        console.log('-------------- ');
                        var returnResponse = function(obj){
                            console.log('obje return = ');
                            console.log(obj);
                            console.log('----------------- ');
                            res.json({user :obj , media:media, devis : user.devis[d]});
                        };
                        var options = {_id:req.body.user._id};
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
exports.removeDevis = function (req, res){
    console.log('--------Debut*******************************----------');
    var devisId = req.params.id;
    var emailUser = req.query.email;

    var targetPath = path.join(__dirname, "../../public/ressources/images/users/imgDevis/"+emailUser+"/"+devisId);
    console.log('--------Target Path----------');
    console.log(targetPath);
    console.log('-------------------');
    console.log('--------Fin**************************************----------');
    fs.remove(targetPath, function (err) {
        if (err) return console.error(err)

        console.log('success!');
        res.json({fileRemove :'success' });
    });
};

