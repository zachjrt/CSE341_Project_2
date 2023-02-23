const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDesign.json');
const isLoggedIn = require('../middleware/auth.js');



router.use('/api-docs', isLoggedIn, swaggerUi.serve);
router.get('/api-docs', isLoggedIn, swaggerUi.setup(swaggerDocument));

module.exports = router;