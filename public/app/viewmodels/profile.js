define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var self = {
        user : window.user,
        profileHtml : ko.observable(),
        activate: function(){

        }
    };
    $.get("/profile", function(data) {
        self.profileHtml(data);
    });
    return self;
});