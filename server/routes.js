const Controller = require('../app/controllers/controller');

module.exports = (app) => {
    app.get('/', Controller.home());

    app.get('/account/:id', Controller.account());

    app.get('/categories', Controller.categories());

    app.get('/login', Controller.login());

    // /register
    // /logout
};