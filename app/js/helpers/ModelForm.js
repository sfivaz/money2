export class ModelForm {

    constructor(cb) {
        this._container = $("#form");
        this._cb = cb;
        this.eventHandlers();
    }

    eventHandlers() {
        this._container.click(event => {
            if (event.target.id === "btn-close-modal") {
                this._close();
            } else if (event.target.id === "btn-submit") {
                if ($(event.target).closest('form')[0].checkValidity()) {
                    event.preventDefault();
                    this._submit();
                }
            }
        });
    }

    template(model) {
        throw new Error("this method should be implemented in the child class");
    }

    open(object = {}) {
        this._container.html(this.template(object));
        $('body').css('overflow', 'hidden');
    }

    _close() {
        this._container.html('');
        $('body').css('overflow', 'auto');
    }

    buildModel() {
        throw new Error("this method should be implemented in the child class");
    }

    _submit() {
        const object = this.buildModel();
        if (object.id)
            this._update(object);
        else
            this._create(object);
    }

    _create(object) {
        object.create().then(newObject => {
            this._cb(newObject);
            this._close();
        });
    }

    _update(object) {
        object.save().then(newObject => {
            this._cb(newObject);
            this._close();
        });
    }
}