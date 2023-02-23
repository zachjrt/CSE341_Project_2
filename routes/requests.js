

const express = require('express');
const contactsController = require('../controllers/requests');
const router = express.Router();
const validation = require('../middleware/validate');
const isLoggedIn = require('../middleware/auth.js')

//Request
router.get('/', isLoggedIn, contactsController.getRequests);
router.get('/:id', isLoggedIn, contactsController.getRequest);

router.post('/', isLoggedIn, validation.saveRequest, contactsController.createRequest);

router.put('/:id', isLoggedIn, validation.saveRequest, contactsController.updateRequest);
router.delete('/:id', isLoggedIn, contactsController.deleteRequest);

module.exports = router;