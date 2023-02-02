

const express = require('express');
const contactsController = require('../controllers/requests');
const router = express.Router();

router.get('/', contactsController.getRequests);
router.get('/:id', contactsController.getRequest);

router.post('/', contactsController.createRequest);

module.exports = router;