const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
//Middleware to dynamically update host and protocol on every request
router.use('/api-docs', (req, res, next) => {
    //Detect HTTPS when hosted behind Render's reverse proxy
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    //Dynamically set host and scheme on the document copy
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [protocol];
    next();
}, swaggerUi.serve, (req, res, next) => {
    //Pass the document to setup dynamically per request
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

//router.use('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
