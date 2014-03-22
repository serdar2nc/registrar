define(function() {
    var ctor = function () {
        this.displayName = 'Welcome to the Registrar!';
        this.description = 'You are accessing the new generation of web application.';
        this.features = [
            'Login via several oAuth providers (Twitter | Facebook | Google | Local)',
            'Schemaless dynamic persistence layer'
        ];
    };

    return ctor;
});