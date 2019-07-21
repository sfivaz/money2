const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new babiliPlugin());
}

module.exports = {
    entry: {
        'bundle-home': './app/home.js',
        'bundle-account': './app/account.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    plugins
};