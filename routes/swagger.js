const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
//Middleware to dynamically update host and protocol on every request
router.use('/api-docs', (req, res, next) => {
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [req.protocol];
    req.swaggerDocument = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());

//router.use('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
