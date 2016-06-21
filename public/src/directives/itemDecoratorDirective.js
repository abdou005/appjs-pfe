/**
 * Created by abdo on 2016-02-12.
 */

'use strict';
app.directive('decorateItem',function(){
    return {
        template: 'nom du Item = {{i.name}} cat_id = {{i.cat_id}}'
    }
});


