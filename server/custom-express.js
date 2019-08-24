const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const webpackDevServer = require('./webpack-dev-server');
const viewsConfig = require('./views-config');
const sessionConfig = require('./session-config');
// const session = require('express-session');

// const {
//     PORT = 3000,
//     NODE_ENV = 'development',
// } = process.env;

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development')
    webpackDevServer(app);

app.use(cors());
app.use(express.json());

viewsConfig(app, express);

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// const {
//     // PORT = 3001,
//     // NODE_ENV = 'development',
//     SESS_NAME = 'sid',
//     SESS_SECRET = 'shiiii!! quited',
//     SESS_LIFETIME = TWO_HOURS
// } = process.env;

// const IN_PROD = NODE_ENV === 'production';

// app.use(session({
//     name: SESS_NAME,
//     resave: false,
//     saveUninitialized: false,
//     secret: SESS_SECRET,
//     cookie: {
//         maxAge: SESS_LIFETIME,
//         sameSite: true,
//         secure: IN_PROD
//     }
// }));

sessionConfig(app);

routes(app);

module.exports = app;