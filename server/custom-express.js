const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const webpack = require('./webpack-dev-server');
const viewsConfig = require('./views-config');
const Controller = require('./controllers/controller');

webpack(app);

app.use(cors());
app.use(express.json());

viewsConfig(app, express);

routes(app);

app.use(Controller.page404());

// app.use(Controller.page500());

module.exports = app;