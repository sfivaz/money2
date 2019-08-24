const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const webpackDevServer = require('./webpack-dev-server');
const viewConfig = require('./view-config');

const NODE_ENV = 'development';

if (NODE_ENV === 'development')
    webpackDevServer(app);

app.use(cors());
app.use(express.json());

/*****************************************************************/

viewConfig(app, express);

/*****************************************************************/

const session = require('express-session');
const AuthHelper = require('./AuthHelper');

app.set(session({
    secret: 'money',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    if (req.path !== '/login' && req.session)
        res.redirect('/login');
    next();
});

app.post('/login', (req, res) => {
    AuthHelper.login(req.body.email, req.body.password)
        .then(user => {
            req.session = user.id;
            res.json(user);
        })
        .catch(() => res.send(401));
});

/*****************************************************************/

routes(app);

/*****************************************************************/

app.use((req, res) =>
    res.status(404).render('./404'));

app.use((err, req, res) =>
    res.status(500).render('./500'));


/*****************************************************************/

module.exports = app;