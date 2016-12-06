
var express = require('express');
var router = express.Router();


module.exports = function(app) {
	app.use('/', router);
}

router.get('/', function(req,res,next) {
	res.send('<h1>Hello World</h1>');
});

router.get('/lists', function(req,res,next) {
	res.json([
		{id: 0, title: 'Personal Things', color:'Blue'},
		{id: 1, title: 'Homework', color:'Red'},
		{id: 2, title: 'Books to Read', color:'Green'}
	]);
});

router.get('/lists/:id', function(req,res,next) {
	res.json([
		{id: 1, title: 'Take out trash', status:'complete'},
		{id: 2, title: 'Walk dog', status:'incomplete'},
		{id: 3, title: 'Clean room', status:'incomplete'}
	]);
});

router.get('/item/:id', function(req,res,next) {
	res.json({
			id: 1,
			title: 'Take out trash', 
			due_date: '10/25/16',
			notes: ['sort recycling first', 'do before dark'],
			status: 'complete'
		}
	);
});

router.post('/lists', function(req,res,next) {
	res.json(req.body.id);
	//console.log(req.body);
});

router.post('/item', function(req,res,next) {
	res.json(req.body.id);
});

router.put('/item/:id', function(req,res, next) {
	res.json({
		id: 2,
		title: 'Feed lizard', 
		due_date: '12/5/16',
		notes: ['buy crickets'],
		status: 'incomplete'
	});

	res.body = req.body;

});

router.delete('/item/:id', function(req, res, next) {
	delete req.body;
	res.sendStatus(200);
});

