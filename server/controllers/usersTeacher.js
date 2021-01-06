const UserTeacher = require('../models/UserTeacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');

const postTeacher = async (req, res) => {
	//Validating Data
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Checking if user already exists
	const emailExist = await UserTeacher.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new UserTeacher({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
		address: req.body.address,
		contact_number: req.body.contact_number,
		date_of_birth: req.body.date_of_birth,
	});
	try {
		const savedUser = await user.save();

		//Token
		const tokentea = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_TEA, {
			expiresIn: 3600,
		});
		res.json({ tokentea, user });
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { postTeacher };
