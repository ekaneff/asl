var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var rest = require('restler');

module.exports = function(app) {
	app.use('/', router);
	app.set('view engine', 'pug');
	app.set('views', './app/views');
}

router.get('/', function(req, res, next) {
	rest.get('http://0.0.0.0:8000/lists').on('error', function(err, response) {
	  console.log("Errored at: " + err + " with a response of " + response); // auto convert to object
	  //res.render('index');
	}).on('success', function(data, response) {
	  //console.log(data); // auto convert to object
	  //console.log(data);
	  //console.log(data);
	  res.render('index', {lists: data});

	});
});

//post for lists
router.post('/', function(req, res, next) {
	console.log(req.body);
	rest.post('http://0.0.0.0:8000/lists', {data:req.body}).on('error', function(err, response) {
		console.log("Errored at: " + err + " with a response of " + response);
	}).on('complete', function(data, response) {
		//console.log(data);
		res.redirect('/');
	});
});

//get list detail
router.get('/lists/:id', function(req, res, next){
	rest.get('http://0.0.0.0:8000/lists/' + req.params.id).on('error', function(err, response) {
	  console.log("Errored at: " + err + " with a response of " + response); // auto convert to object
	}).on('complete', function(data, response) {
	  //console.log(data);
	  //console.log(response.statusCode);
	  res.render('list', {list: data});
	});
});

//get item detail
router.get('/items/:id', function(req, res, next){
	rest.get('http://0.0.0.0:8000/items/' + req.params.id).on('error', function(err, response) {
	  console.log("Errored at: " + err + " with a response of " + response); // auto convert to object
	}).on('complete', function(data, response) {
	  console.log(data);
	  //console.log(response.statusCode);
	  res.render('item', {item: data});
	});
});

//post for item
router.post('/items', function(req, res, next) {
	console.log(req.body);
	rest.post('http://0.0.0.0:8000/items', {data:req.body}).on('error', function(err, response) {
		console.log("Errored at: " + err + " with a response of " + response);
	}).on('complete', function(data, response) {
		//console.log(data);
		res.redirect('/lists/' + data.lists_id);
	});
});

//delete for item
router.get('/items/:id/destroy', function(req, res, next) {
	//console.log(req.params.id);
	rest.get('http://0.0.0.0:8000/items/' + req.params.id + '/destroy').on('error', function(err, response) {
		console.log("Errored at: " + err + " with a response of " + response);
	}).on('complete', function(data, response) {
		//console.log(data);
		//console.log(response.statusMessage);
		res.redirect('/');
		//console.log(response.statusCode);
	});
});

//get edit view
router.get('/items/:id/edit', function(req, res, next){
	rest.get('http://0.0.0.0:8000/items/' + req.params.id + '/edit').on('error', function(err, response) {
	  console.log("Errored at: " + err + " with a response of " + response); // auto convert to object
	}).on('complete', function(data, response) {
	  //console.log(data);
	  //console.log(response.statusCode);
	  res.render('edit', {item: data});
	});
});

//update for item
router.post('/items/:id/update', function(req, res, next) {
	rest.post('http://0.0.0.0:8000/items/' + req.params.id + '/update', {data:req.body}).on('error', function(err, response) {
		console.log("Errored at: " + err + " with a response of " + response);
	}).on('complete', function(data, response) {
		//console.log(data);
		//console.log(response.statusMessage);
		res.redirect('/lists/' + data.lists_id);
		//console.log(response.statusCode);
	});
});

