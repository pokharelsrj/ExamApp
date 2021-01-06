const express = require('express');
const router = express.Router();

//Import Controllers
const { postresult, loadresult } = require('../../controllers/postresult');

router.post('/', postresult);
router.get('/', loadresult);

module.exports = router;
