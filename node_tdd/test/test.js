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
		.expect(200, [
			{id: 0, title: 'Personal Things', color:'Blue'},
			{id: 1, title: 'Homework', color:'Red'},
			{id: 2, title: 'Books to Read', color:'Green'}
		], done);
	});

	it('Responded with json of list of todo items with title and status', function(done) {
		request(server)
		.get('/lists/:id')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200,[
			{id: 1, title: 'Take out trash', status:'complete'},
			{id: 2, title: 'Walk dog', status:'incomplete'},
			{id: 3, title: 'Clean room', status:'incomplete'}
		], done);
	});

	it('Responded with single list item with all parts', function(done) {
		request(server)
		.get('/item/:id')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200,{
			id: 1,
			title: 'Take out trash', 
			due_date: '10/25/16',
			notes: ['sort recycling first', 'do before dark'],
			status: 'complete'
		},done);
	});

	it('Responded with new list item', function(done) {
		request(server)
		.post('/lists')
		.send({id: 3, title:'Movies', color:'Orange'})
		.expect(200, '3', done);
	});

	it('Responded with new todo item', function(done) {
		request(server)
		.post('/item')
		.send({id:4, title:'Do laundry', due_date:'12/25/16', 'notes': ['get cash', 'separate delicates'], status:'complete'})
		.expect(200, '4', done);
	});

	it('Updated todo item', function(done) {
		request(server)
		.put('/item/:id')
		.expect(function(res) {
			res.body.status = 'complete';
		})
		.expect(200,
			{
				id: 2,
				title: 'Feed lizard', 
				due_date: '12/5/16',
				notes: ['buy crickets'],
				status: 'complete'
			},
			done);
	});

	it('Deleted todo item', function(done) {
		request(server)
		.del('/item/:id')
		.send({id:2, title:'Feed Lizard', due_date:'12/5/16', 'notes': ['buy crickets'], status:'complete'})
		.expect(200, done);
	});
});

