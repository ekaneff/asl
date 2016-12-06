var request = require('supertest');

describe('Json', function(){
	beforeEach(function(){
		server = require('../server.js');
	});

	afterEach(function(){
		server.close;
	});

	it('Responded with json of lists with title and color', function(done) {
		request(server)
		.get('/lists')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Responded with json of list of todo items with title and status', function(done) {
		request(server)
		.get('/lists/:id')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Responded with single list item with all parts', function(done) {
		request(server)
		.get('/item/:id')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Responded with new list item', function(done) {
		request(server)
		.post('/lists')
		.send({id: 3, title:'Movies', color:'Orange'})
		.expect(200, done);
	});

	it('Responded with new todo item', function(done) {
		request(server)
		.post('/item')
		.send({id:4, title:'Do laundry', due_date:'12/25/16', 'notes': ['get cash', 'separate delicates'], status:'complete'})
		.expect(200, done);
	});

	it('Updated todo item', function(done) {
		request(server)
		.put('/item/:id')
		.send({id:2, title:'Feed Lizard', due_date:'12/5/16', 'notes': ['buy crickets'], status:'complete'})
		.expect(200, done);
	});

	it('Deleted todo item', function(done) {
		request(server)
		.del('/item/:id')
		.send({id:2, title:'Feed Lizard', due_date:'12/5/16', 'notes': ['buy crickets'], status:'complete'})
		.expect(200, done);
	});
});

