const session = require('express-session');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    SESS_NAME = 'sid',
    SESS_SECRET = 'shiiii!! quited',
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = 'development',
} = process.env;

const IN_PROD = NODE_ENV === 'production';

module.exports = app => {

    app.use(session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: true,
            secure: IN_PROD
        }
    }));
};

