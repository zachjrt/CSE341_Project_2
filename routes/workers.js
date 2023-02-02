

const express = require('express');
const contactsController = require('../controllers/workers');
const router = express.Router();
//Workers
router.get('/', contactsController.getWorkers);
router.get('/:id', contactsController.getWorker);

router.post('/', contactsController.createWorker);

module.exports = router;