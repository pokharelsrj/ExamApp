const PostResult = require('../models/PostResult');

const postresult = async (req, res) => {
	//Create Result
	const result = new PostResult({
		test_name: req.body.test_name,
		student_name: req.body.student_name,
		marks: req.body.marks,
		no_of_questions: req.body.no_of_questions,
	});
	try {
		const ab = await result.save();

		res.json({
			result,
		});
	} catch (err) {
		console.log(err.message);
	}
};

const loadresult = async (req, res) => {
	try {
		const result = await PostResult.find();
		res.json(result);
	} catch (err) {
		res.json(err.message);
	}
};

module.exports = {
	postresult,
	loadresult,
};
