const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const ejs = require('ejs').renderFile;
const session = require('express-session');
const routes = require('./routes');
const AuthHelper = require('./AuthHelper');
const webpackDevServer = require('./webpack-dev-server');

const NODE_ENV = 'development';

if (NODE_ENV === 'development')
    webpackDevServer(app);

const root = path.resolve(__dirname, '../');

app.use(cors());
app.use(express.json());

app.use('/styles', express.static(root + '/app/styles'));

app.set('views', path.join(root + '/app/views'));
app.engine('html', ejs);
app.set('view engine', 'ejs');

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

routes(app);

app.use((req, res) =>
    res.status(404).render('./404'));

app.use((err, req, res) =>
    res.status(500).render('./500'));

module.exports = app;