const Controller = require('./controllers/controller');

module.exports = app => {

    app.get('/', Controller.home());

    app.get('/account/:id', Controller.account());

    app.get('/categories', Controller.categories());

    app.get('/login', Controller.login());

    app.get('/register', Controller.register());
};