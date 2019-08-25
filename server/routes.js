const Controller = require('./controllers/controller');

const isAuth = (req, res, next) => {
    if (req.session.user)
        next();
    else
        res.redirect('/login');
};

const isGuest = (req, res, next) => {
    if (!req.session.user)
        next();
    else
        res.redirect('/');
};

module.exports = app => {

    app.get('/', isAuth, Controller.home());

    app.get('/account/:id', isAuth, Controller.account());

    app.get('/categories', isAuth, Controller.categories());

    app.get('/login', isGuest, Controller.login());

    app.get('/register', isGuest, Controller.register());

    app.post('/login', Controller.execLogin());

    app.post('/register', Controller.execRegister());
};