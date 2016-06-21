/**
 * Created by abdo on 2016-03-02.
 */
'use strict';

app.service('contentRepository',function($http,$rootScope){

    this.getDomaines= function(cb){
        $http({method: 'GET', url: '/domaines'}).success(function(resp){
            console.log("resp = ",resp);
           return cb(resp);
         });
        return false;
    }

    this.createDomaine = function(d,cb){
        console.log(d);
        $http({method: 'POST', data: d, url: '/domaines', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
            console.log(resp);
            return cb(resp);
        });
        return false;
    }

    this.removeDomaine = function(id,cb){
        console.log(id);
        $http.delete('/domaines/' + id+'?token='+$rootScope.token_current_user).success(function(resp){
            console.log('domaine deleted = ',resp);
            console.log(resp);
            return cb(resp);

        });
        return false;
    }
    this.editDomaine = function(id,cb){

        $http.get('/domaines/'+id).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    }

    this.updateDomaine = function(d,cb){
        console.log('Id Object et Object = ',d);
        $http({method: 'PUT', data: d, url: '/domaines', headers: {'x-access-token': $rootScope.token_current_user}}).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    }

});
