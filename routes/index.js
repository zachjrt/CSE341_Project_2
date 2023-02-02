const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/requests', require('./requests'));
router.use('/workers', require('./workers'));


module.exports = router;