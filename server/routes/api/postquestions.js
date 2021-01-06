const express = require('express');
const router = express.Router();
const authtea = require('../../middlewares/authteacher');

//Import Controllers
const {
	postquestions,
	loadquestions,
	deletequestions,
} = require('../../controllers/postquestions');

router.post('/', postquestions);
router.get('/', loadquestions);
router.delete('/delete/:id', deletequestions);

module.exports = router;
