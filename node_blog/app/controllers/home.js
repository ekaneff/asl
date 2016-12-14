
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var lodash = require('lodash');


module.exports = function(app) {
	app.use('/', router);
	app.set('view engine', 'pug');
	app.set('views', './app/views');

	app.get('/', getPosts, function(req, res, next) {
		res.render('index', {posts: req.posts, success:false});
	});
}

var postDataPath = path.join(__dirname, '/../data/posts.json');

function savePosts(posts) {
	var json = JSON.stringify(posts);

	fs.writeFile(postDataPath, json, 'utf8', function(){});
}

function getPosts(req, res, next) {
	fs.readFile(postDataPath, function(err, data) {
		//add error handling here later
		req.posts = JSON.parse(data);
		next();
	});
}

router.post('/', getPosts, function(req, res, next) {
	console.log(req.body);
	//form validation
	req.checkBody('title', 'You must enter a title').notEmpty();
	req.checkBody('date', 'You must enter a date').notEmpty();
	req.checkBody('author', 'You must enter a author').notEmpty();
	req.checkBody('summary', 'You must enter a summary').notEmpty();
	req.checkBody('full_post', 'You must enter a post').notEmpty();
	var errors = req.validationErrors();
	if(errors) {
		//res.send(errors[0].msg);
		res.render('index', {posts:req.posts, errors:errors})
	} else {
		req.posts[req.body.title] = req.body;
		savePosts(req.posts);
		res.redirect('/');
	}
	
});

router.get('/post/:title', getPosts, function(req, res, next) {
	var title = req.params.title;
	var choice = lodash.filter(req.posts, x => x.title == title);
	console.log(choice);
	res.render('post', {data:choice[0]});
});

