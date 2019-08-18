import {Account} from "../../models/Account";

export class TransactionForm {

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

    open(object = {}) {
        this._container.html(TransactionForm.template(object));
        $('body').css('overflow', 'hidden');
    }

    _close() {
        this._container.html('');
        $('body').css('overflow', 'auto');
    }

    static buildModel() {
        const id = $("#transaction-id").val();
        const name = $("#transaction-name").val();
        const balance = $("#transaction-balance").val();
        return new Account(id, name, balance);
    }

    static template(transaction) {
        let action = 'Create';
        if (transaction.id) {
            action = 'Edit';
        }
        return `
            <div class="my-modal">
                <div class="d-flex align-items-start">
                    <h2 class="f-1">${action} transaction</h2>
                    <button id="btn-close-modal" class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <div class="form-group">
                        <div>
                            <label>description</label>
                            <input class="form-control" placeholder="description">
                        </div>
                    </div>
                    <div class="form-row ">
                        <div class="col">
                            <label>type</label>
                            <select class="form-control"></select>
                        </div>
                        <div class="col">
                            <label>value</label>
                            <input class="form-control">
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <div class="col">
                            <label>category</label>
                            <select class="form-control"></select>
                        </div>
                        <div class="col">
                            <label>date</label>
                            <input class="form-control" type="date">
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <div class="col">
                            <label>source account</label>
                            <select class="form-control"></select>
                        </div>
                        <div class="col">
                            <label>destination account</label>
                            <select class="form-control" disabled></select>
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <button id="btn-submit" class="btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;

        // //declaring specials
        // ["spending", "income", "transfer"].forEach((type, key) =>
        //     template.slcType[key] = new Option(type, type));
        //
        // template.slcType.addEventListener("change", () =>
        //     template.slcAccountDestiny.disabled = (template.slcType.value !== "transfer"));
    }
}