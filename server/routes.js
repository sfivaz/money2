const Controller = require('./controllers/controller');

const isGuest = (req, res, next) => {
    if (!req.session.userId)
        res.redirect('/login');
    else
        next();
};

const isAuth = (req, res, next) => {
    if (req.session.userId)
        res.redirect('/home');
    else
        next();
};

module.exports = app => {

    app.use((req, res, next) => {
        const {userId} = req.session;
        console.log(userId);
        next();
    });

    app.get('/', isGuest, Controller.home());

    app.get('/account/:id', isGuest, Controller.account());

    app.get('/categories', isGuest, Controller.categories());

    app.get('/login', isAuth, Controller.login());

    app.post('/login', Controller.execLogin());

    app.post('/logout', Controller.execLogout());

    // /register
};