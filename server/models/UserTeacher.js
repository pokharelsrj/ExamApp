const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTeacherSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	contact_number: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	date_of_birth: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('UserTeacher', UserTeacherSchema);
