module.exports = (app) => {
    app.get('/', (req, res) =>
        res.render('./home'));

    app.get('/account/:id', (req, res) =>
        res.render('./account', {id: req.params.id}));

    app.get('/categories', (req, res) =>
        res.render('./categories'));

    app.get('/login', (req, res) =>
        res.render('./login'));

    // /register
    // /login
    // /logout
};