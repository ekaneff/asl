
var glob = require('glob');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(app) {
	//adding middlewear
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(expressValidator());

	var controllers = glob.sync(__dirname + '/controllers/*.js');

	controllers.forEach(function(controllerFileName) {
		require(controllerFileName)(app);
	});

	console.log(controllers);
	console.log(__dirname);
}