const express = require('express');
const router = express.Router();
const authtea = require('../../middlewares/authteacher');
//Import Models
const UserTeacher = require('../../models/UserTeacher');

//Import Controllers
const {
	postTeachers,
	searchTeachers,
} = require('../../controllers/authTeacher');

router.post('/', postTeachers);
router.get('/userteacher', authtea, searchTeachers);

module.exports = router;
