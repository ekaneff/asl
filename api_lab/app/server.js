var express = require('express');
var app = express();

var port = 3000;
var laravel = 8000;

app.listen(port, function() {
  console.log('Server running on port: '+ port);
});

var myApp = require('./app/app');
myApp(app);