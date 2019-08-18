export class ConfirmDeleteModal {

    constructor(cb) {
        this._confirmModalContainer = $("#confirm-modal");
        this._cb = cb;
        this._eventHandlers();
    }

    _eventHandlers() {
        this._confirmModalContainer.click(event => {
            if (event.target.id === "btn-confirm") {
                const id = event.target.getAttribute("data-id");
                this._delete(id);
            } else if (event.target.id === "btn-cancel") {
                this._closeConfirm();
            }
        });
    }

    static template(element, id) {
        return `
            <div class="my-modal">
                <h2 class="text-center">Delete ${element}</h2>
                <p>Are you sure you want to delete this ${element}?</p>
                <div class="d-flex justify-content-around">
                    <button id="btn-confirm" data-id="${id}" class="btn btn-success">Yes</button>
                    <button id="btn-cancel" class="btn btn-danger">No</button>
                </div>
            </div>
        `;
    }

    _closeConfirm() {
        this._confirmModalContainer.html('');
    }

    _openConfirm(element, id) {
        this._confirmModalContainer.html(ConfirmDeleteModal.template(element, id));
    }

    _delete(id) {
        this._cb(id);
        this._closeConfirm();
    }
}