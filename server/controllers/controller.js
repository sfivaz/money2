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
}

module.exports = Controller;