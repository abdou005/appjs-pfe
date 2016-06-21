'use strict';

app.service('devisRepository',function($http){

    this.getDevis = function(cb){
        $http.get('/Devis').success(function(resp){
                console.log('i got the data I request');
                     
            console.log("resp = ",resp);
           return cb(resp);
         });
        return false;
    };

    this.createDevis = function(d,cb){
        console.log(d);
        $http.post('/demanderDevis',d).success(function(resp){
            console.log(resp);
            return cb(resp);
        });
        return false;
    };

    this.removeDevis = function(id,cb){
        console.log(id);
        $http.delete('/demanderDevis/' + id).success(function(resp){
            console.log('devis deleted = ',resp);
            console.log(resp);
            return cb(resp);

        });
        return false;
    };
    this.editDevis = function(id,cb){

        $http.get('/demanderDevis/'+id).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    };

    this.updateDevis = function(d,cb){
        console.log('Id Object et Object = ',d);
        $http.put('/demanderDevis/',d).success(function(resp){
            console.log('resp = ',resp);
            return cb(resp);
        });
        return false;
    };

});
