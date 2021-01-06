const jwt = require('jsonwebtoken');

function authtea(req, res, next) {
	const tokentea = req.header('auth-tokentea');
	if (!tokentea) return res.status(401).send('Access Denied'); //checks if token exists

	try {
		const verified = jwt.verify(tokentea, process.env.TOKEN_SECRET_TEA);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
}

module.exports = authtea;
