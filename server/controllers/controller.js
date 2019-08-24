const AuthHelper = require('../AuthHelper');

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
            AuthHelper.login(req.body.email, req.body.password)
                .then(user => {
                    req.session.userId = user.id;
                    res.json(user);
                })
                .catch(() => res.send(401));
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