module.exports = (app) => {
    app.get('/', function (req, res) {
        res.render('./home.html');
    });

    app.get('/account/:id', function (req, res) {
        res.render('./account', {id: req.params.id});
    });

    app.get('/categories', function (req, res) {
        res.render('./categories.html');
    });

    // /register
    // /login
    // /logout
};