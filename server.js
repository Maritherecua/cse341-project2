const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
        session({
            secret: process.env.SESSION_SECRET || 'dev_secret_key',
            resave: false,
            saveUninitialized: true
        })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes'));

// Passport GitHub OAuth configuration
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || 'dummy_client_id',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy_client_secret',
            callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/github/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Global uncaught exception and unhandled promise rejection handling
process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`);
        });
    }
});
