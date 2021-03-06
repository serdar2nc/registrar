﻿define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout'], function (sys, http, app, ko) {
    var ctor = function() {
        var self = this;
        this.data = ko.observableArray();
        this.navigate = function(row) {
            app.showMessage(JSON.stringify(row), 'Talep: '+ row._id, ['Ok']);
        };

        this.activate =  function() {
            $.get( "wf", function( data ) {
                sys.log('workflows', data);
                self.data(data);
            }, "json" );

        };
    };
    return ctor;
});