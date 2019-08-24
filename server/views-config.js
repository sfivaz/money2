const ejs = require('ejs').renderFile;
const path = require('path');

module.exports = (app, express) => {

    const root = path.resolve(__dirname, '../');

    app.use('/styles', express.static(root + '/app/styles'));

    app.set('views', path.join(root + '/app/views'));
    app.engine('html', ejs);
    app.set('view engine', 'ejs');

};