var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
	name: String, 
	phone_number: Number, 
	email: String, 
	dob: Date
});

module.exports = mongoose.model('Contact', contactSchema);