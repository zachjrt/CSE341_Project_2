const express = require('express');
const router = express.Router();

router.use('/requests', require('./requests'))
router.use('/', require('./swagger'));

module.exports = router;