var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
	name: String,
	color: String
});

module.exports = mongoose.model('List', listSchema);