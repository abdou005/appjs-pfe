/**
 * Created by abdo on 2016-02-11.
 */
'use strict';
app
    .controller('contentCtrl',function($scope,contentProvider){


        var refrechTous = function(){
            contentProvider.getDomaines(function(data){
                $scope.domaines = data;
                $scope.domaine = '';
                $scope.tags = '';
                $scope.specialites = '';
                $scope.tag= '';
                $scope.specialite= '';
            });

         };
        var refrech = function(){
            contentProvider.getDomaines(function(data){
                $scope.domaines = data;
            });

        };
        refrechTous();

        $scope.createTag = function(){
            if($scope.tags)
            {
                $scope.tags.push($scope.tag);
            }else{
                var tags = [];
                $scope.tags = tags;
                $scope.tags.push($scope.tag);
            }
            $scope.tag= '';
            console.log($scope.tags);
        };

        $scope.createSpecialite = function(){
            if($scope.specialites)
            {
                $scope.specialites.push($scope.specialite);
            }else{
                var specialites = [];
                $scope.specialites = specialites;
                $scope.specialites.push($scope.specialite);
            }
            $scope.specialite= '';
            console.log($scope.specialites);
        };

        $scope.removeTag = function(t){
            console.log(t);
            for(var tag in $scope.tags){
                if($scope.tags[tag] == t){
                    $scope.tags.splice(tag,1);
                }
            }
        };

        $scope.removeSpecialite = function(s){
            console.log(s);
            for(var spc in $scope.specialites){
                if($scope.specialites[spc] == s){
                    $scope.specialites.splice(spc,1);
                }
            }
        };

        $scope.createDomaine = function(){
            console.log($scope.domaine);
            console.log($scope.tags);
            $scope.domaine.tags = $scope.tags;
            $scope.domaine.specialites = $scope.specialites;
            console.log('--------------');
            console.log($scope.domaine);
            console.log('--------------');
            contentProvider.createDomaine($scope.domaine,function(data){
                console.log('data =',data);
            });
            refrechTous();
        };

        $scope.removeTagDom = function(t,d){
            contentProvider.editDomaine(d._id,function(data){
                console.log('data = ',data);
                for(var tag in data.tags ){
                    console.log(data.tags[tag]._id);
                    if(data.tags[tag]._id == t._id){
                        data.tags.splice(tag,1);
                    }
                }
                contentProvider.updateDomaine(data,function(data){
                    console.log('data = ',data);
                    $scope.domaine = data;
                });
                refrech();
            });

        };

        $scope.removeSpecialiteDom = function(s,d){
            contentProvider.editDomaine(d._id,function(data){
                console.log('data = ',data);
                for(var spec in data.specialites ){
                    if(data.specialites[spec]._id == s._id){
                        data.specialites.splice(spec,1);
                    }
                }
                contentProvider.updateDomaine(data,function(data){
                    console.log('data = ',data);
                    $scope.domaine = data;
                });
                refrech();
            });

        };

        $scope.removeDomaine = function(id){
            contentProvider.removeDomaine(id,function(data){
                console.log('data = ',data);
            });
            refrechTous();
        };

        $scope.editDomaine = function(id){
            console.log('Object ID = ',id);
            console.log('scope.c = ',$scope.domaine);
            contentProvider.editDomaine(id,function(data){
                console.log('data = ',data);
                $scope.domaine = data;
            });

        };

        $scope.updateDomaine = function(){
            if($scope.tags){
                for(var t in $scope.tags){
                    $scope.domaine.tags.push($scope.tags[t]);
                }
                $scope.tags = '';
            }
            if($scope.specialites){
                for(var s in $scope.specialites){
                    $scope.domaine.specialites.push($scope.specialites[s]);
                }
                $scope.specialites = '';
            }
            contentProvider.updateDomaine($scope.domaine,function(data){
                console.log('data = ',data);
                $scope.domaine = data;
            });
            refrech();
        };

        $scope.deselect = function(){
            $scope.domaine = '';
        }
    });
