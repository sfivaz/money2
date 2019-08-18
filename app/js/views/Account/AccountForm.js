import {Account} from "../../models/Account";

export class AccountForm {

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

    static template(account) {
        let action = 'Create';
        if (account.id) {
            action = 'Edit';
        }
        return `
            <div class="my-modal">
                <div class="d-flex align-items-center">
                    <h2 class="f-1">${action}</h2>
                    <button id="btn-close-modal" class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <input id="account-id" type="hidden" value="${account.id || ''}">
                    <div class="form-group">
                        <label>name</label>
                        <input id="account-name" class="form-control" placeholder="name" value="${account.name || ''}" 
                            required>
                    </div>
                    <div>
                        <button id="btn-submit" class="btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;
    }

    open(object = {}) {
        this._container.html(AccountForm.template(object));
        $('body').css('overflow', 'hidden');
    }

    _close() {
        this._container.html('');
        $('body').css('overflow', 'auto');
    }

    static buildModel() {
        const id = $("#account-id").val();
        const name = $("#account-name").val();
        return new Account(id, name);
    }

    _submit() {
        const object = AccountForm.buildModel();
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