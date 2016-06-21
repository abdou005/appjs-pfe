
'use strict';


app.service('devisProvider',function(devisRepository){


    this.getDevis = function(cb){
        devisRepository.getDevis(function(data){
            return cb(data);
        });
    };

    this.createDevis = function(d,cb){
        devisRepository.createDevis(d,function(data){
            console.log('data = ',data);
            return cb(data);
        });
    };

    this.removeDevis = function(id,cb){
        devisRepository.removeDevis(id,function(data){
           console.log('data = ',data);
            return cb(data);
        });
    };

    this.editDevis = function(id,cb){
        devisRepository.editDevis(id,function(data){
          console.log('data = ',data);
           return cb(data);
       });
    };

    this.updateDevis = function(d,cb){
        devisRepository.updateDevis(d,function(data){
            console.log('data = ',data);
            return cb(data);
        });
    };
});
