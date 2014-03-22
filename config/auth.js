// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '142093315845264', // your App ID
		'clientSecret' 	: '433074152dfc32c6d1804a8a56d8f067', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'ckplSoVU680o11gpn6znA',
		'consumerSecret' 	: 'HM20PgJlvvrLVP1vqO5Ge41lclorXp4uTXrFeprfZY',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '72541029021-be6ne01l312m2ikranlm2bpo00lg7kh2.apps.googleusercontent.com',
		'clientSecret' 	: 'kD-rlG5JQCC8cBrzImCOH5Zk',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};