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
}

module.exports = Controller;