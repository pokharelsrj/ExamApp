const express = require('express');
const router = express.Router();

//Import Models
const User = require('../../models/User');

//Import Controllers
const { postUsers, isStudent } = require('../../controllers/users');

router.post('/', postUsers);

module.exports = router;
