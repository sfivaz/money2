const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const ejs = require('ejs').renderFile;

const root = path.join(__dirname + '../../../');

app.use(cors());
app.use(express.json());

app.use('/styles', express.static(root + '/app/styles'));

app.set('views', path.join(root + '/app/views'));
app.engine('html', ejs);
app.set('view engine', 'ejs');

const routes = require('../routes');
routes(app);

module.exports = app;