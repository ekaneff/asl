var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var passport = require('passport');
var passportGithub = require('../auth/github');

var Contact = mongoose.model('Contact');


module.exports = function(app) {
	app.use('/', router);
	app.set('view engine', 'pug');
	app.set('views', './app/views');

	app.get('/', function(req, res, next) {
		Contact.find(function(err, contacts) {
			res.render('index', {contacts: contacts, user:req.user});
		});
	});
}

//api routes
router.get('/api', function(req, res, next) {
	Contact.find(function(err, contacts) {
		res.json(contacts);
	});
});

router.get('/api/:name', function(req, res, next) {
	Contact.find({name:req.params.name}, function(err, contact) {
		res.json(contact);
	});
});

//github auth
router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user.email']}));

router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), function(req, res, next) {
	red.redirect('/');
});

//create new contact
router.get('/add', function(req, res, next) {
	res.render('add');
});

router.post('/add', function(req, res, next) {
	//console.log(req.body);
	req.checkBody('name', 'You must enter a name').notEmpty();
	//COULD NOT GET ANY OF THESE TO WORK AND NO IDEA WHY
	// req.checkBody('phone_number', 'You must enter a phone number').notEmpty();
	// req.checkBody('phone_number', 'Phone number must be a number').isNumeric();
	// req.checkBody('phone_number', 'Phone number must be at least 10 characters').len(10, 10);
	req.checkBody('email', 'You must enter a valid email').isEmail();
	req.checkBody('dob', 'You must enter a valid birthday').isDate();

	var errors = req.validationErrors();
	if(errors) {
		res.render('add', {errors: errors})
	} else {
		var contact = new Contact({
			name: req.body.name,
			phone_number: req.body.phone,
			email: req.body.email,
			dob: req.body.dob
		});

		contact.validate(function(err) {
			console.log(err);
		});

		contact.save(function(err) {
			if (err) return err;
			res.redirect('/');
		});
	}
	
});

//contact details page
router.get('/contact/:name', function(req, res, next) {
	Contact.find({name: req.params.name}, function(err, contact) {
		res.render('contact', {contact: contact});
	});
});

//delete contact
router.get('/delete/:name', function(req, res, next) {
	Contact.remove({name : req.params.name}, function(err) {
		if (err) return err;
	});

	res.redirect('/');
});

//load edit form
router.get('/edit/:name', function(req, res, next) {
	Contact.find({name: req.params.name}, function(err, contact) {
		var dob = contact[0].dob.toISOString().substring(0,10);
		//console.log(dob);
		res.render('edit', {contact: contact[0], dob: dob});
	});
});

//update contact
router.post('/update', function(req, res, next) {
	Contact.update({name: req.body.old_name}, {$set: {old_name: req.body.name, name: req.body.name, phone_number: req.body.phone, email: req.body.email, dob: req.body.dob}}, function(err, contact) {
		res.redirect('/');
	});
});




