'use strict';
app
	.controller('loginCtrl',function($scope,$http,$rootScope,$location,$window,contentProvider,homeProvider,socketDevisFactory){

		var refrech = function(){
			console.log($rootScope.current_user);
			contentProvider.getDomaines(function(data){
				console.log(data);
				$scope.domaines = data;
				$scope.user = $scope.token = $scope.messageLogin = $scope.error_messageLogin ='';
				$scope.showPrest = $scope.showSpec = $scope.showClient = false;
				$scope.showErrorLogin = $scope.showConfirmLogin = false;
			});
		};
		refrech();
		$scope.getHome = function(){
			$window.location.href = '/index.html';
		};
		$scope.getBordRegister = function(){
			$window.location.href = '/bord.html#toregister';
		};
		$scope.getBordLogin = function(){
			$window.location.href = '/bord.html#tologin';
		};
		$scope.loginUserHome = function(){
			$rootScope.loading = true;
			$http.post('/users/authenticate',$scope.user).success(function(resp){
				if(resp.success){
					$rootScope.authenticated = true;
					$rootScope.current_user = resp.user;
					$rootScope.token_current_user = resp.token;
					console.log(resp.user.typeUser[0]);
					// client socket connect
					socketDevisFactory.emit('new-client',$rootScope.current_user);

					switch (resp.user.typeUser[0]) {
						case 'client':
							$rootScope.isClient = true;
							$location.path('/profilClient');
							break;
						case 'artisan':
							$rootScope.isArtisan = true;
							$location.path('/profilArtisan');
							break;
						case 'admin':
							$rootScope.isAdmin = true;
							$location.path('/profilAdmin');
							break;
						default:
							$scope.messageLogin = resp.user.email;
					}
					console.log('profil');
				}
				else{
					$scope.error_messageLogin = resp.messageLogin;
				}
				$rootScope.loading = false;
			});
		};
		$scope.getSpecialites = function(d){
			$scope.showSpec = true;
				contentProvider.editDomaine(d,function(data){
					$scope.domaine._id = data._id;
				 	$scope.specialitesDom = data.specialites;
				});
		};
		$scope.registerUser = function(){
			var newUser = {
				email : $scope.user.email,
				password :$scope.user.password,
				typeUser : $scope.user.typeUser,
				specialites : []
			};
			console.log(newUser);
				if($scope.user.typeUser == 'artisan'){
					if(!$scope.user.specialites){
						$scope.showConfirmLogin = false;
						$scope.showErrorLogin = true;
						$scope.error_messageLogin = 'Vous devez selectionner au moins une spécialite ?';
						return false;
					}else{
						var specArray = $scope.user.specialites;
						console.log(specArray);
						console.log(newUser);
						for(var i =0 ; i<specArray.length; i++){
							console.log(specArray[i]);
							newUser.specialites.push({name:specArray[i]});
						}
						console.log(newUser);
					}
				}else{
					delete newUser.specialites;
					console.log('client');
				}
			homeProvider.registerUser(newUser,function(data){
				if(typeof  data._id == 'undefined'){
					console.log('No I Devis');
					$scope.showConfirmLogin = false;
					$scope.showErrorLogin = true;
					$scope.error_messageLogin = 'Compte existe avec cette adresse e-*mail';
					return false;
				}else{
					$scope.user.email = data.email;
					$scope.user.password = data.password;
					$scope.showErrorLogin = false;
					$scope.showConfirmLogin = true;
					$scope.messageLogin = 'Vous pouvez vous connecter';
					$window.location.href = '/bord.html#tologin';
				}


			});

		};
		$scope.getToken = function(){
			console.log($rootScope.token_current_user);
			var id = 'Strig Id';
			$http({method: 'GET', url: '/auth/token/'+id, headers: {'x-access-token': $rootScope.token_current_user}})
				.then(function(data){
					$scope.messageLogin = data;
			});
		};
		$scope.loginUser = function(){
			$rootScope.loading = true;
				$http.post('/users/authenticate',$scope.user).success(function(resp){
					if(resp.success){
						$rootScope.authenticated = true;
						$rootScope.current_user = resp.user;
						$rootScope.token_current_user = resp.token;
						$scope.showConfirmLogin = false;
						$scope.showErrorLogin = false;
						$scope.error_messageLogin = $scope.messageLogin = '';
						// client socket connect
						socketDevisFactory.emit('new-client',$rootScope.current_user);

						switch (resp.user.typeUser[0]) {
							case 'client':
								$rootScope.isClient = true;
								$location.path('/profilClient');
								break;
							case 'artisan':
								$rootScope.isArtisan = true;
								$location.path('/profilArtisan');
								break;
							case 'admin':
								$rootScope.isAdmin = true;
								$location.path('/profilAdmin');
								break;
							case 'superAdmin':
								$rootScope.isSuperAdmin = true;
								$location.path('/profilSuperAdmin');
								break;
							default:
								$scope.messageLogin = resp.user.email;
						}
						console.log(resp.user.typeUser[0]);
						console.log('profil');
					}
					else{
						$scope.showConfirmLogin = false;
						$scope.showErrorLogin = true;
						$scope.error_messageLogin = resp.message;
					}
					$rootScope.loading = false;
				});

		};
		$scope.deselect = function(){
			refrech();
		};
	});
