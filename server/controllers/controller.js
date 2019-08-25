const AuthHelper = require('../auth-helper');

class Controller {

    static home() {
        return (req, res) => res.render('./home');
    }

    static account() {
        return (req, res) => res.render('./account', {id: req.params.id});
    }

    static categories() {
        return (req, res) => res.render('./categories');
    }

    static login() {
        return (req, res) => res.render('./login');
    }

    static register() {
        return (req, res) => res.render('./register');
    }

    static page404() {
        return (req, res) => res.status(404).render('./404');
    }

    static page500() {
        return (err, req, res, next) => res.status(500).render('./500');
    }

    static execRegister() {
        return (req, res) => {
            AuthHelper.register(req.body)
                .then(result => {
                    console.log(result);
                    if (result.status && result.status === 409)
                        res.json(result);
                    else {
                        res.json({
                            status: 200,
                            message: 'user created'
                        });
                    }
                });
        }
    }
}

module.exports = Controller;