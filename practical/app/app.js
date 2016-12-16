var bodyParser = require('body-parser'); 
var glob = require('glob');
var expressValidator = require('express-validator');


var passport = require('passport');
var db = require('./db');
var expressSession = require('express-session');

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	db.findById(id, function(err, user) {
		if(err) {
			return cb(err);
		}
		cb(null, user);
	});
});

//database
var db = require('./db');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(expressValidator());

	app.use(expressSession({
	  	secret: 'ewqoituweoqhgjragjkhiewur', 
	  	resave: false,
	  	saveUninitialized: false 
	  }));

	  app.use(passport.initialize());
	  app.use(passport.session());

	var models = glob.sync(__dirname + '/models/*.js');
	models.forEach(function(modelFileName) {
		require(modelFileName);
	});

	var controllers = glob.sync(__dirname + '/controllers/*.js');
	//console.log(controllers);
	controllers.forEach(function(controllerFileName) {
		var controller = require(controllerFileName);
		controller(app);
	});

}