const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Home']
    //#swagger.summary='API Root Welcome endpoint'
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName || req.session.user.username}. <a href="/auth/logout">Logout</a> | <a href="/api-docs">View API Docs</a>`
            : `Logged out. <a href="/auth/github">Login with GitHub</a> | <a href="/api-docs">View API Docs</a>`
    );
});

router.use('/auth', require('./auth'));
router.use('/workouts', require('./workouts'));
router.use('/exercises', require('./exercises'));

module.exports = router;
