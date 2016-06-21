/**
 * Created by abdo on 2016-02-12.
 */
'use strict';


app.service('contentProvider',function(contentRepository){


    this.getDomaines = function(cb){
        contentRepository.getDomaines(function(data){
            return cb(data);
        });
    };

    this.createDomaine = function(d,cb){
        contentRepository.createDomaine(d,function(data){
            console.log('data = ',data);
            return cb(data);
        });
    };

    this.removeDomaine = function(id,cb){
        contentRepository.removeDomaine(id,function(data){
           console.log('data = ',data);
            return cb(data);
        });
    };

    this.editDomaine = function(id,cb){
        contentRepository.editDomaine(id,function(data){

          console.log('data = ',data);
           return cb(data);
       });
    };

    this.updateDomaine = function(d,cb){
        contentRepository.updateDomaine(d,function(data){
            console.log('data = ',data);
            return cb(data);
        });
    };
});
