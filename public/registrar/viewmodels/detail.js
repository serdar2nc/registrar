define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'plugins/dialog', 'mapping'], function (sys, http, app, ko, dialog, mapping) {
    var ctor = function (row) {
        var self = this;
        sys.log('row', row);
        this.row = row;
        this.save = function(data){
            "use strict";
            //sys.log(data);
            data.state('done');


            $.ajax({
                type: "PUT",
                url: 'wf/'+data._id(),
                contentType: "application/json",
                data: mapping.toJSON(data)
            }).done(function(){
               dialog.close(self);
            });
            //sys.log(data.state);
        };
        this.closeDialog = function(){
            "use strict";
            //sys.log('closing', self);
            dialog.close(self);
        }
    };

    return ctor;
});