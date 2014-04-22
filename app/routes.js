var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var configDB = require('../config/database.js');
var wfs = require("./models/workflow.js");

module.exports = function(app, passport) {
    var mainIndex  = "/main";
// normal routes ===============================================================
    app.post('/wf', isLoggedIn, function(req, res){
        req.body.when = new Date();
        req.body.sender = req.user.local.email;
        console.log('saving', req.body);
        new wfs(req.body).save(function(err, data){
            if(err)
                return res.send(err);
            console.log('saved', data);
            res.send(data);

        });
    });

    app.put('/wf/:id', isLoggedIn, function(req, res){
        console.log('saving', req.body);
        delete req._id;

        wfs.findByIdAndUpdate(req.params.id,req.body, {}, function(err, data){
            if(err)
                return res.send(err);
            console.log('saved', data);
            res.send(data);

        });
    });

    app.get('/wf', isLoggedIn, function(req, res){
        var crit = {sender : req.user.local.email };
        if(req.user.local.email === 'admin')
            crit = {state: 'pending', assignedTo: 'registrar'};
        wfs.find(crit, function(err, data){
            res.send(data);
        });
    });

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

    app.get('/main', isLoggedIn, function(req, res) {
        res.render('main.ejs', {
            user : req.user
        });
    });
    app.get("/upload", isLoggedIn, function(req, res) {
        res.redirect("/main");
    });
    app.post("/upload", isLoggedIn, function(req, res) {
        var conn = mongoose.createConnection(configDB.url);
        conn.once('open', function () {
            var gfs = Grid(conn.db, mongoose.mongo);
            //console.log(req.body);
            var file = req.files.file;
            var writestream = gfs.createWriteStream({filename: file.name, user: req.user.local.id});
            fs.createReadStream(file.path).pipe(writestream);

            writestream.on('close', function (file) {
                console.log(file);
                req.user.local.imageId = file._id;
                req.user.save();

                res.end('<html><head><meta http-equiv="refresh" content="2;url=/main#docs"></head>'+"<body>"+"ok: " + file._id+"</body></html>");
            });
        });
    });

    app.get("/download", isLoggedIn, function(req, res) {
        var conn = mongoose.createConnection(configDB.url);
        conn.once('open', function () {
            var gfs = Grid(conn.db, mongoose.mongo);
            try {
                if(!req.user.local.imageId)
                    return res.status(404).send('Not found');
                var fs = gfs.createReadStream({_id: req.user.local.imageId});
                fs.pipe(res);
            }catch(ex){
                console.log(ex);
                res.status(404).send('Not found');
            }
        });
    });

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : mainIndex, // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : mainIndex, // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));

	// twitter --------------------------------



		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : mainIndex, // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : mainIndex,
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
