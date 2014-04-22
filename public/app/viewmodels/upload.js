define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    return {
        imagePath: ko.observable(),
        status : ko.observable('Choose a file and upload'),
        selectFile: function(ctrl){
            var file = ctrl.files[0];
            this.imagePath(window.URL.createObjectURL(file));
            this.status(JSON.stringify(file));
        },
        comment: ko.observable(),
        activate: function () {

        },
        ajaxSubmit: function() {
            this.status('uploading the file ...');

            $.ajax({
                type: "POST",
                url: "/upload",
                enctype: 'multipart/form-data',
                data: $('#uploadForm').serialize(),
                success: function () {
                    alert("Data Uploaded:");
                }
            });

            // Have to stop the form from submitting and causing
            // a page refresh - don't forget this
            return false;
        }
    }
});