var request = require('supertest');

describe('Json', function(){
	beforeEach(function(){
		server = require('../server.js');
	});

	afterEach(function() {
		server.close;
	});

	it("Responded with new contact", function(done) {
		request(server)
		.get('/api')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, [{"_id":"58541d4092e3bb50d51a8410","name":"Nick Carlson","phone_number":353452,"email":"nick@gmail.com","dob":"2016-12-02T00:00:00.000Z","__v":0},{"_id":"58542ee17c67cf52e89ccc98","name":"emily","phone_number":32543,"email":"emilykaneff@yahoo.com","dob":"2016-12-09T00:00:00.000Z","__v":0}], done);
	});
});