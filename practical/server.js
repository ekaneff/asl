var NODE_ENV = process.env.NODE_ENV || 'developmet';

if(NODE_ENV === 'developmet') {
	require('dotenv').load();
	console.log('process.env.MONGO_HOST', process.env.MONGO_HOST);
}

var express = require('express');
var app = express();

var port = 3000;

app.listen(port, function() {
	console.log("Server running on port " + port);
});

var myApp = require('./app/app');

myApp(app);