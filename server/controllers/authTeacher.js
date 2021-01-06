const UserTeacher = require('../models/UserTeacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../validation');

const postTeachers = async (req, res) => {
	//Validating Data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Checking if username is correct
	const user = await UserTeacher.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email does not exist');

	//Checking if Password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Incorrect password');
	const tokentea = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_TEA, {
		expiresIn: 3600,
	});
	res.json({ tokentea, user });
};

const searchTeachers = async (req, res) => {
	const user = await UserTeacher.findById(req.user._id).select('-password');
	res.json(user);
};
module.exports = { postTeachers, searchTeachers };
