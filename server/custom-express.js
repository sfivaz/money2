const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const webpackDevServer = require('./webpack-dev-server');
const viewsConfig = require('./views-config');
const sessionConfig = require('./session-config');
const Controller = require('./controllers/controller');

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development')
    webpackDevServer(app);

app.use(cors());
app.use(express.json());

viewsConfig(app, express);

sessionConfig(app);

routes(app);

app.use(Controller.page404());

app.use(Controller.page500());

module.exports = app;