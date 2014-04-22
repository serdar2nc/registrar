define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'viewmodels/detail', 'mapping'], function (sys, http, app, ko, detailView, mapping) {
    var ctor = function() {
        var self = this;
        this.data = ko.observableArray();
        this.navigate = function(row) {
            //row.viewUrl = 'views/detail';
            app.showDialog(new detailView(this));

            //app.showMessage(JSON.stringify(row), 'Talep: '+ row._id, ['Ok']);
        };

        this.activate =  function() {
            $.get( "wf", function( data ) {
                sys.log('workflows', data);
                mapping.fromJS(data, {}, self.data);
            }, "json" );

        };
    };
    return ctor;
});