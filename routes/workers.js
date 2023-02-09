

const express = require('express');
const contactsController = require('../controllers/workers');
const router = express.Router();
const validation = require('../middleware/validate')
//Workers
router.get('/', contactsController.getWorkers);
router.get('/:id', contactsController.getWorker);

router.post('/', validation.saveWorker, contactsController.createWorker);

router.put('/:id', validation.saveWorker, contactsController.updateWorker);
router.delete('/:id', contactsController.deleteWorker);

module.exports = router;