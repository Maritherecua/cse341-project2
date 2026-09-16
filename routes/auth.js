const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: true
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Route to check login status
router.get('/status', (req, res) => {
    if (req.session && req.session.user) {
        res.json({
            status: 'Logged In',
            user: req.session.user
        });
    } else {
        res.json({
            status: 'Logged Out',
            message: 'You are currently not logged in.'
        });
    }
});

// Route to log out
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;
