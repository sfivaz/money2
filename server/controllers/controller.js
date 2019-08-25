const AuthHelper = require('../auth-helper');

const SESS_NAME = 'sid';

class Controller {

    static home() {
        return (req, res) => res.render('./home', {user: req.session.user});
    }

    static account() {
        return (req, res) => res.render('./account', {id: req.params.id, user: req.session.user});
    }

    static categories() {
        return (req, res) => res.render('./categories', {user: req.session.user});
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

    static execLogin() {
        return (req, res) => {
            const {email, password} = req.body;
            AuthHelper.login(email, password)
                .then(result => {
                    console.log(result);
                    if (result.status && result.status === 401)
                        res.json(result);
                    else {
                        req.session.user = result;
                        res.json(result);
                        // res.json({
                        //     status: 200,
                        //     message: 'login sucessful'
                        // });
                    }
                });
        }
    }

    static execLogout() {
        return (req, res) => {
            req.session.destroy(err => {
                if (err)
                    return res.redirect('/');

                res.clearCookie(SESS_NAME);
                res.redirect('/login');
            });
        }
    }

    static execRegister() {
        return (req, res) => {
            AuthHelper.register(req.body)
                .then(result => {
                    console.log(result);
                    if (result.status && result.status === 409)
                        res.json(result);
                    else {
                        req.session.user = result;
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