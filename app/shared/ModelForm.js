export class ModelForm {

    constructor(cb) {
        this._container = $("#form");
        this._cb = cb;
        this.eventHandlers();
    }

    eventHandlers() {
        this._container.click(event => {
            if (event.target.id === "btn-close-modal")
                this._close();
        });

        this._container.submit(event => {
            this._submitForm(event);
        });
    }

    _submitForm(event) {
        event.preventDefault();
        if ($(event.target).closest('form')[0].checkValidity()) {
            this.dataProcess();
            this.submit();
        }
    }

    dataProcess() {
    }

    template(model) {
        throw new Error("this method should be implemented in the child class");
    }

    open(object = {}) {
        this._container.html(this.template(object));
        $('body').css('overflow', 'hidden');
        //TODO check it later
        // $('form').validate({
        //     destination:
        // });
    }

    _close() {
        this._container.html('');
        $('body').css('overflow', 'auto');
    }

    buildModel() {
        throw new Error("this method should be implemented in the child class");
    }

    submit() {
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