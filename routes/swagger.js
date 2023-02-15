const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDesign.json');
const index = require('../static/index.html');

router.use('/', function (req, res) { res.sendFile("../static/index.html");});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;