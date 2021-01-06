const mongoose = require('mongoose');
const PostQuestions = require('../models/PostQuestions');

const { questionValidation } = require('../validation');

const postquestions = async (req, res) => {
	//Validating Data
	const { error } = questionValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Create a new question
	const questions = new PostQuestions({
		test_name: req.body.test_name,
		no_of_questions: req.body.no_of_questions,
		questions_pool: req.body.questions_pool,
	});
	try {
		const savedquestion = await questions.save();

		res.json({
			questions,
		});
	} catch (err) {
		console.log(err.message);
	}
};

const loadquestions = async (req, res) => {
	try {
		const questions = await PostQuestions.find();
		res.json(questions);
	} catch (err) {
		res.json(err.message);
	}
};

const deletequestions = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No Question with that ID');

	await PostQuestions.findByIdAndRemove(id);
	res.json({ message: 'Question Deleted' });
};

module.exports = {
	postquestions,
	loadquestions,
	deletequestions,
};
