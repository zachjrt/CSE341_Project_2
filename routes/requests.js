

const express = require('express');
const contactsController = require('../controllers/requests');
const router = express.Router();
const validation = require('../middleware/validate')
//Request
router.get('/', contactsController.getRequests);
router.get('/:id', contactsController.getRequest);

router.post('/', validation.saveRequest, contactsController.createRequest);

router.put('/:id', validation.saveRequest, contactsController.updateRequest);
router.delete('/:id', contactsController.deleteRequest);

module.exports = router;