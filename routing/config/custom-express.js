const express = require('express');
const app = express();
const cors = require('cors');
// const pug = require('pug');

app.use(cors());
app.use(express.json());

app.set('views', __dirname);
// app.set('views', __dirname + '/views');
// app.engine('html', pug);
// app.set('view engine', 'pug');

const routes = require('../routes');
routes(app);

module.exports = app;