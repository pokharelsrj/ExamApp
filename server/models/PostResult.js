const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostResult = new Schema({
	test_name: {
		type: String,
		required: true,
	},
	student_name: {
		type: String,
		required: true,
	},
	marks: {
		type: Number,
		required: true,
	},
	no_of_questions: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('results', PostResult);
