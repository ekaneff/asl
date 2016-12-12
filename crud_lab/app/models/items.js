var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	list_name: String,
	title: String,
	notes: String,
	status: {
		type: String,
		enum: ['complete', 'incomplete']
	}
});

module.exports = mongoose.model('Item', itemSchema);