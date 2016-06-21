/**
 * Created by abdo on 2016-04-24.
 */

app.controller('uploadCtrl', ['$scope','Upload', '$timeout','$rootScope', function ($scope, Upload, $timeout,$rootScope) {

		$scope.upload = function (file) {
				Upload.upload({
					url: '/profil/upload/',
					data: $rootScope.current_user,
					file: file
				}).then(function(response) {
					console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
					$timeout(function () {
						file.result = response.data.mediaProfil;
					});
					if (response.status > 0){
						//$scope.errorMsg = response.status + ': ' + response.data.mediaProfil;
						$scope.errorMsg = response.status ;
						console.log('-------------');
						console.log(response.data);
						$rootScope.current_user = response.data;
					}
				},function (resp) {
					console.log('Error status: ' + resp.status);
					if (resp.status > 0){
						$scope.errorMsg = resp.status ;
						//$scope.errorMsg = resp.status + ': ' + resp.data.mediaProfil;
					}
				}, function(evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
		}

}])
	.controller('uploadDocCtrl', function ($scope, Upload, $timeout,$rootScope,socketDevisFactory,homeProvider,notificationProvider) {
		$scope.uploadDoc = function (file,document) {
			console.log(file);
			console.log(document);
			Upload.upload({
				url: '/document/upload/',
				data: {email : $rootScope.current_user.email, idUser : $rootScope.current_user._id, idDocs : document._id },
				file: file
			}).then(function(response) {
				console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' , response.data);
				$timeout(function () {
					file.result = response.data.mediaDocs;
				});
				if (response.status > 0){
					$scope.errorMsg = response.status + ': ' + response.data.mediaDocs;
					console.log('-------------');
					console.log(response.data);
					$rootScope.current_user = response.data.user;
				}
			},function (resp) {
				console.log('Error status: ' + resp.status);
				if (resp.status > 0){
					$scope.errorMsg = resp.status + ': ' + resp.data.mediaDocs;
				}
			}, function(evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			/*var str = '/confirmUser';
			var notification = {
				message : 'Vous aves Recue un document ',
				pathDestination : str
			};
			homeProvider.getUsers(function(data){
				console.log(data);
				for(var u in data){
					console.log(data[u].email);
					if(data[u].typeUser[0] == 'admin'){
						notificationProvider.createNotif(notification,function(notif){
							console.log(notif);
							homeProvider.editUser(data[u]._id,function(admin){
								admin.notifications.push(notif);
								homeProvider.updateUser(admin,function(updateAdmin){
									console.log(updateAdmin);
									socketDevisFactory.emit('new-doc-prest',updateAdmin._id);
								});
							});
						});
					}
				}
			});*/

		};

	});
