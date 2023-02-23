

const express = require('express');
const contactsController = require('../controllers/workers');
const router = express.Router();
const validation = require('../middleware/validate')
const isLoggedIn = require('../middleware/auth.js')

//Workers
router.get('/', isLoggedIn, contactsController.getWorkers);
router.get('/:id', isLoggedIn, contactsController.getWorker);

router.post('/', isLoggedIn, validation.saveWorker, contactsController.createWorker);

router.put('/:id', isLoggedIn, validation.saveWorker, contactsController.updateWorker);
router.delete('/:id', isLoggedIn, contactsController.deleteWorker);

module.exports = router;