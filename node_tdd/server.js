var express = require('express');
var app = express();


app.listen(3000, function() {
	console.log("Listening on port 3000");
});

require ('./app/app.js')(app);

module.exports = app;