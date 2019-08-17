module.exports = (app) => {
    app.get('/a', function (req, res) {
        res.render('./index.html');
    });
};