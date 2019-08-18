const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const ejs = require('ejs').renderFile;
const routes = require('./routes');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');

const devServerEnabled = true;

if (devServerEnabled) {
    //reload=true:Enable auto reloading when changing JS files or content
    //timeout=1000:Time from disconnecting from server to reconnecting
    for (let key in config.entry) {
        if (config.entry.hasOwnProperty(key))
            config.entry[key].unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
    }

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

const root = path.resolve(__dirname, '../');

app.use(cors());
app.use(express.json());

app.use('/styles', express.static(root + '/app/styles'));

app.set('views', path.join(root + '/app/views'));
app.engine('html', ejs);
app.set('view engine', 'ejs');

routes(app);

module.exports = app;