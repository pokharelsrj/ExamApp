const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required().messages({
			'string.base': `Please Enter a valid name`,
			'string.empty': `Name cannot be an empty field`,
			'string.min': `Name should have a minimum length of {#limit}`,
			'any.required': `Name is a required field`,
		}),
		email: Joi.string().min(6).required().email().messages({
			'string.base': `Please enter a valid Email`,
			'string.empty': `Email cannot be an empty field`,
			'string.min': `Email should have a minimum length of {#limit}`,
			'any.required': `Email is a required field`,
		}),
		password: Joi.string().min(6).required().messages({
			'string.base': `Please Enter a valid password`,
			'string.empty': `Password cannot be an empty field`,
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is a required field`,
		}),
		contact_number: Joi.number().min(10).messages({
			'number.base': `Please Enter a valid number`,
			'number.empty': `Contact Number cannot be an empty field`,
			'number.min': `Contact Number should have a minimum length of {#limit}`,

			'any.required': `Contact Number is a required field`,
		}),
		address: Joi.string().min(6).required().messages({
			'string.base': `Please Enter a valid address`,
			'string.empty': `Address cannot be an empty field`,
			'string.min': `Address should have a minimum length of {#limit}`,
			'any.required': `Address is a required field`,
		}),
		date_of_birth: Joi.date(),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email().messages({
			'string.base': `Please enter a valid Email`,
			'string.empty': `Email cannot be an empty field`,
			'string.min': `Email should have a minimum length of {#limit}`,
			'any.required': `Email is a required field`,
		}),
		password: Joi.string().min(6).required().messages({
			'string.base': `Please Enter a valid password`,
			'string.empty': `Password cannot be an empty field`,
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is a required field`,
		}),
	});
	return schema.validate(data);
};

const questionValidation = (data) => {
	const schema = Joi.object({
		test_name: Joi.string().required(),
		no_of_questions: Joi.number().required(),
		questions_pool: Joi.array().items({
			question: Joi.string().required(),
			option_a: Joi.string().required(),
			option_b: Joi.string().required(),
			option_c: Joi.string().required(),
			option_d: Joi.string().required(),
			correct_option: Joi.string().required(),
		}),
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.questionValidation = questionValidation;
