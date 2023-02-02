const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/requests', require('./requests'))


module.exports = router;