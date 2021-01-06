const express = require('express');
const router = express.Router();

//Import Models
const UserTeacher = require('../../models/UserTeacher');

//Import Controllers
const { postTeacher } = require('../../controllers/usersTeacher');

router.post('/', postTeacher);

module.exports = router;
