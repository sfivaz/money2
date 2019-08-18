export class AccountForm {

    constructor() {
        this._container = $("#form");
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

    static template(account) {
        let action = 'Create';
        if (account.id) {
            action = 'Edit';
        }
        return `
            <div class="my-modal">
                <div class="d-flex align-items-center">
                    <h2 class="f-1">${action}</h2>
                    <button class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <div class="form-group">
                        <label>name</label>
                        <input class="form-control" placeholder="name">
                    </div>
                    <div>
                        <button class="btn-submit btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;

        // template.btnClose.addEventListener("click", () =>
        //     template.form.parentElement.removeChild(template.form));
    }

    open(object = {}) {
        this._container.html(AccountForm.template(object));
        $('body').css('overflow', 'hidden');
    }

    _close() {
        this._container.html('');
        $('body').css('overflow', 'auto');
    }

    _submit() {
        // const object = this.buildModel();
        // if (object.id)
        //     this._update(object);
        // else
        //     this._create(object);
    }
}