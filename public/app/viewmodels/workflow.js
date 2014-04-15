define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout'], function (sys, http, app, ko) {
    var ctor = function() {
        var self = this;
        this.availableCategories = ko.observableArray(['diploma', 'terhis']);
        this.selectedCategory = ko.observable();
        this.desc =  ko.observable();
        this.response = ko.observable();

        this.save =  function() {
            var req = {queue: 'student-request',
                category: self.selectedCategory(),
                state: 'pending',
                assignedTo : 'registrar',
                comment : self.desc()};
            sys.log('Sending', req);
            $.post("wf", req)
                .done(function(data) {
                    sys.log("Saved", data);
                    self.response(data);
                });
        };
    };
    return ctor;
});