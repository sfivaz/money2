const AuthHelper = require('./AuthHelper');

module.exports = (app) => {
    app.get('/', (req, res) =>
        res.render('./home'));

    app.get('/account/:id', (req, res) =>
        res.render('./account', {id: req.params.id}));

    app.get('/categories', (req, res) =>
        res.render('./categories'));

    app.get('/login', (req, res) =>
        res.render('./login'));

    app.post('/login', (req, res) => {
        AuthHelper.login(req.body.email, req.body.password)
            .then(user => {
                req.session = user.id;
                res.json(user);
            })
            .catch(() => res.send(401));
    });

    // /register
    // /logout
};