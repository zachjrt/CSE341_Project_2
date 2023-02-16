const express = require('express');
const router = express.Router();
const path = require('path');

//Not ready yet. Crashes
// router.use('/', (req, res) => { res.sendFile(path.join(__dirname, '/static/index.html'))},  require('./swagger'));

router.use('/', require('./swagger'));
router.use('/requests', require('./requests'));
router.use('/workers', require('./workers'));




module.exports = router;