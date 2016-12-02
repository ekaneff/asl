var express = require('express');
var app = express();

app.use('/static', express.static('public'));


//routes
// app.get('/', function(req, res) {
// 	res.render('index', {title: "Test code", message: "This is a temp message"});
// });

app.listen(3000, function() {
	console.log("Listening on port 3000");
});

require ('./app/app.js')(app);