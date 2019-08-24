const AuthHelper = require('../auth-helper');

const SESS_NAME = 'sid';

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

    static page404() {
        return (req, res) => res.status(404).render('./404');
    }

    static page500() {
        return (err, req, res) => res.status(500).render('./500');
    }

    static execLogin() {
        return (req, res) => {
            const {email, password} = req.body;
            AuthHelper.login(email, password)
                .then(user => {
                    req.session.userId = user.id;
                    res.json({
                        message: 'login sucessful',
                        code: 200
                    });
                })
                .catch(() => {
                    res.json({
                        message: 'login failed',
                        code: 401
                    })
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
}

module.exports = Controller;