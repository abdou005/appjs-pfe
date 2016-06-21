
'use strict';
app
	.controller('demandeDevisCtrl',function($scope,$http,$rootScope,devisProvider,$interval,homeProvider,socketDevisFactory,contentProvider,Upload,$timeout,notificationProvider){

        $scope.messages = [];
        socketDevisFactory.on('message',function(data){
           $scope.messages.push(data.message);
        });

		var refrechTous = function(){
            $rootScope.loading = true;
            $scope.domaines = [];
            $scope.listePresataire = [];
            $scope.devis= '';
            $scope.showBtnSendDevis = true;
            $scope.nbrMax = 5;
            for(var adr in $rootScope.current_user.adresses ){
                if($rootScope.current_user.adresses[adr].isDefault){
                    $scope.adresseDevis = $rootScope.current_user.adresses[adr];
                }
            }
            contentProvider.getDomaines(function(data){
                $scope.domaines = data;
                    homeProvider.getUsers(function(data){
                        for(var p in data){
                            if(data[p].typeUser[0]== 'artisan'){
                                $scope.listePresataire.push(data[p]);
                            }
                        }
                        $rootScope.loading = false;
                    });
            });
         };
        refrechTous();
        $scope.setInformation = function(){
            $rootScope.loading = true;
            $scope.devis.adresseDevis = $scope.adresseDevis;
            console.log($scope.devis);
            $scope.devis.state = 'waiting';
            $scope.devis.clientId = $rootScope.current_user._id;
            console.log('--------Devis------------');
            console.log($scope.devis);
            console.log('--------Type de contact------------');
            console.log($scope.contactType);
            console.log('--------service------------');
            console.log($scope.devis.specialites);
            console.log('-------Current User avant save----------');
            console.log($rootScope.current_user);
            $scope.devis.prestataireId = '';
            $rootScope.current_user.devisNormal = $scope.devis;
            $http({method: 'PUT', data: $rootScope.current_user, url: '/users/addDevisNormal', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
                console.log('------Resp----------');
                console.log(resp);
                $rootScope.current_user = resp.user;
                console.log('-------Current User----------');
                console.log($rootScope.current_user);
                console.log('-------DevisNormal----------');
                console.log(resp.devisNormal);
                $scope.devis = resp.devisNormal;
                $scope.showBtnSendDevis = false;

                if($scope.file1){
                    console.log('---------File1-----------');
                    console.log($scope.file1);
                            Upload.upload({
                                url: '/profil/uploadImgDevis/',
                                data: {user : $rootScope.current_user, devis : resp.devisNormal},
                                file: $scope.file1
                            }).then(function(response) {
                                console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
                                $timeout(function () {
                                    $scope.file1.result = response.data.media;
                                });
                                if (response.status > 0){
                                    $scope.errorMsg1 = response.status + ': ' + response.data.media.name;
                                    console.log('-------------');
                                    console.log(response.data);
                                    $rootScope.current_user = response.data.user;
                                }
                                if($scope.file2){
                                    console.log('---------File2-----------');
                                    console.log($scope.file2);
                                    Upload.upload({
                                        url: '/profil/uploadImgDevis/',
                                        data: {user : $rootScope.current_user, devis : resp.devisNormal},
                                        file: $scope.file2
                                    }).then(function(response) {
                                        console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
                                        $timeout(function () {
                                            $scope.file2.result = response.data.media;
                                        });
                                        if (response.status > 0){
                                            $scope.errorMsg2 = response.status + ': ' + response.data.media.name;
                                            console.log('-------------');
                                            console.log(response.data);
                                            $rootScope.current_user = response.data.user;
                                        }
                                        if($scope.file3){
                                            console.log('---------File3-----------');
                                            console.log($scope.file3);
                                            Upload.upload({
                                                url: '/profil/uploadImgDevis/',
                                                data: {user : $rootScope.current_user, devis : resp.devisNormal},
                                                file: $scope.file3
                                            }).then(function(response) {
                                                console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
                                                $timeout(function () {
                                                    $scope.file3.result = response.data.media;
                                                });
                                                if (response.status > 0){
                                                    $scope.errorMsg3 = response.status + ': ' + response.data.media.name;
                                                    console.log('-------------');
                                                    console.log(response.data);
                                                    $rootScope.current_user = response.data.user;
                                                }
                                                if($scope.file4){
                                                    console.log('--------File4------------');
                                                    console.log($scope.file4);
                                                    Upload.upload({
                                                        url: '/profil/uploadImgDevis/',
                                                        data: {user : $rootScope.current_user, devis : resp.devisNormal},
                                                        file: $scope.file4
                                                    }).then(function(response) {
                                                        console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
                                                        $timeout(function () {
                                                            $scope.file4.result = response.data.media;
                                                        });
                                                        if (response.status > 0){
                                                            $scope.errorMsg4 = response.status + ': ' + response.data.media.name;
                                                            console.log('-------------');
                                                            console.log(response.data);
                                                            $rootScope.current_user = response.data.user;
                                                        }
                                                    },function (resp) {
                                                        console.log('Error status: ' + resp.status);
                                                        if (resp.status > 0){
                                                            $scope.errorMsg4 = resp.status + ': ' + resp.data.media.name;
                                                        }
                                                    }, function(evt) {
                                                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                                        $scope.file4.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                                    });
                                                }
                                            },function (resp) {
                                                console.log('Error status: ' + resp.status);
                                                if (resp.status > 0){
                                                    $scope.errorMsg3 = resp.status + ': ' + resp.data.media.name;
                                                }

                                            }, function(evt) {
                                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                                $scope.file3.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                            });
                                        }
                                    },function (resp) {
                                        console.log('Error status: ' + resp.status);
                                        if (resp.status > 0){
                                            $scope.errorMsg2 = resp.status + ': ' + resp.data.media.name;
                                        }

                                    }, function(evt) {
                                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                        $scope.file2.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                    });
                                }
                            },function (resp) {
                                console.log('Error status: ' + resp.status);
                                if (resp.status > 0){
                                    $scope.errorMsg1 = resp.status + ': ' + resp.data.media;
                                }
                            }, function(evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                $scope.file1.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                            });
                }
                $rootScope.loading = false;

            });
        };

        $scope.setContact = function(prestId){
            $rootScope.loading = true;
            console.log('prestataire Id = ',prestId);
            console.log('devis Id =',$scope.devis._id);
            if(typeof  $scope.devis._id == 'undefined'){
                console.log('No I Devis');
                return false;
            }else{

                for(var p in $scope.listePresataire){
                    if($scope.listePresataire[p]._id == prestId){
                        var str = '/'+$scope.devis._id;
                            var notification = {
                                message : 'Vous aves Recue un demande de devis',
                                pathDestination : str
                            };
                        homeProvider.editUser(prestId,function(prestataire){
                            console.log(prestataire);
                            notificationProvider.createNotif(notification,function(notif){
                                console.log(notif);
                                prestataire.notifications.push(notif);
                                    homeProvider.updateUser(prestataire,function(data){
                                        console.log('update Prestataire =',data);
                                    });
                            });
                        });
                        $scope.listePresataire.splice(p,1);
                        $scope.nbrMax-=1;
                    }
                }
            }
            $rootScope.loading = false;
        };

        $scope.refrechMap= function(){
            /* var latitude1  = 39.46;
             var longitude1 = -0.36;
             var latitude2  = 40.40;
             var longitude2 = -3.68;
             var distance = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1,longitude1), new google.maps.LatLng(latitude2,longitude2)) / 1000).toFixed(2);
             console.log('distance = ',distance);*/

            var latlng = new google.maps.LatLng($scope.adresseDevis.location[1], $scope.adresseDevis.location[0]);
            var map = new google.maps.Map(document.getElementById('map'),{
                zoom : 7,
                center :latlng
            });
            var infoWindow = new google.maps.InfoWindow({map: map});
            var pos = {
                lat: $scope.adresseDevis.location[1],
                lng: $scope.adresseDevis.location[0]
            };
            console.log(pos);
            infoWindow.setPosition(pos);
            var  contentString =
                '<p><b>Lieu</b>: ' + $scope.adresseDevis.lieu +
                '<br><b>Departement</b>: ' + $scope.adresseDevis.dep +
                '<br><b>Region</b>: ' + $scope.adresseDevis.region +
                '<br><b>Code Postal</b>: ' + $scope.adresseDevis.codePostal +
                '</p>';
            infoWindow.setContent(contentString);
            var marker = new google.maps.Marker({
                position : latlng,
                animation: google.maps.Animation.BOUNCE,
                map : map,
                title : 'Bouger ce curseur',
                icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                draggable : true
            });
            // Construct the circle for each value in citymap.
            var cityCircle = new google.maps.Circle({
                strokeColor: '#1ABB9C',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#1ABB9C',
                fillOpacity: 0.35,
                map: map,
                center: pos,
                radius: Math.sqrt($scope.adresseDevis.InterventionArea) * 100
            });
        };

        $scope.isConfirmDevis = function(d){
            if(d == 'confirm'){
                return 'success';
            }else{
                return 'danger';
            }

        };
        $scope.removeDevis = function(id){
            $rootScope.loading = true;
            $http.delete('/profil/removeDevis/' +id+'?token='+$rootScope.token_current_user+'&email='+$rootScope.current_user.email).success(function(resp){
                console.log(resp);
            });
            for(var devi in $rootScope.current_user.devis){
                if($rootScope.current_user.devis[devi]._id == id){
                    console.log('devis trouver ',$rootScope.current_user.devis[devi]);
                    $rootScope.current_user.devis.splice(devi,1);
                        homeProvider.updateUser($rootScope.current_user,function(data){
                            $rootScope.current_user = data;
                        });
                }
            }
            $rootScope.loading = false;

        };
        $scope.deselect = function(){
            $scope.devis = '';
        };

	});


