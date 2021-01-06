const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
//Import Models
const User = require('../../models/User');

//Import Controllers
const { postStudents, searchStudents } = require('../../controllers/auth');

router.post('/', postStudents);
router.get('/user', auth, searchStudents);

module.exports = router;
