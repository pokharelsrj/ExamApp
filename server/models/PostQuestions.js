const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostQuestions = new Schema({
	test_name: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	no_of_questions: {
		type: Number,
		required: true,
	},
	questions_pool: [
		{
			question: {
				type: String,
			},
			option_a: {
				type: String,
			},
			option_b: {
				type: String,
			},
			option_c: {
				type: String,
			},
			option_d: {
				type: String,
			},
			correct_option: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model('questions', PostQuestions);
