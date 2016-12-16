var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

//models because actual models wouldnt work
var List = mongoose.model('List');
var Item = mongoose.model('Item');


//functions

module.exports = function(app) {
	app.use('/', router);
	app.set('view engine', 'pug');
	app.set('views', './app/views');

	app.get('/', function(req, res, next) {
		List.find(function (err, list) {
			res.render('index', {lists: list});
		});
	});
}

//save lists
router.post('/', function(req, res, next) {
	console.log(req.body);
	
	var list = new List({
		name: req.body.name,
		color: req.body.color
	});
	list.validate(function(err) {
		console.log(err);
	});
	console.log(list);
	list.save(function(err) {
		if (err) return handleError(err);
		res.redirect('/');
	});
});


//click list for list details page
router.get('/list/:name', function(req, res, next) {
	List.find({name : req.params.name}, function (err, list) {
		Item.find({list_name : req.params.name}, function(err, item) {
			//console.log(item);
			res.render('list', {list: list, items: item});
		});
	});
});

//create new items
router.post('/item', function(req, res, next) {
	console.log(req.body.list_name);
	var item = new Item({
		list_name: req.body.list_name,
		title: req.body.title,
		due_date: req.body.due_date,
		notes: req.body.notes,
		status: req.body.status
	});
	item.validate(function(err) {
		console.log(err);
	});

	item.save(function(err, item) {
		if (err) return handleError(err);
		res.redirect('/list/' + item.list_name);
	});
	console.log(item);
});

//load item details
router.get('/item/:title', function(req, res, next) {
	Item.find({title: req.params.title}, function (err, item) {
		console.log(item);
		res.render('item', {item: item});
	});
});

//delete items
router.get('/delete/:title', function(req,res, next) {
	Item.remove({title : req.params.title},function (err) {
		if (err) return handleError(err);
	});

	//ASK HOW TO REDIRECT TO SPECIFIC LIST
	res.redirect('/');
});

//update items
router.get('/edit/:title', function(req, res, next) {
	Item.find({title: req.params.title}, function (err, item) {
		res.render('update', {item: item[0]});
	});
});

//update items
router.post('/update', function(req, res, next) {
	Item.update({title: req.body.old_name}, {$set: {old_name: req.body.title, title: req.body.title, notes: req.body.notes, status: req.body.status}}, function (err, item) {
		res.redirect('/');
	});
});


