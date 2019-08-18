import {ConfirmDeleteModal} from "../shared/ConfirmDeleteModal";

export class ModelPageView {

    constructor(model) {
        this._container = $(".page");
        this._list = $("#list");
        this.model = model;
        this.childForm = null;
        this._confirmModal = new ConfirmDeleteModal(id => this._deleteChild(id));
        this.init();
        this.childName = null;
    }

    init() {
        this.updateTemplate(this.model);
        this.eventHandlers();
    }

    eventHandlers() {
        this._container.click(event => {
            const button = $(event.target).closest('button');
            if (button.attr('id') === 'btn-create-child')
                this._createChild();
            else if (button.hasClass('btn-edit-row'))
                this._editChild(event);
            else if (button.hasClass('btn-delete-row'))
                this._openDeleteModal(event);
        });
    }

    template(model) {
        throw "Error this method should be overridden by its extended class";
    }

    listTemplate(children) {
        throw "Error this method should be overridden by its extended class";
    }

    updateTemplate(model) {
        throw "Error this method should be overridden by its extended class";
    }

    _createChild() {
        this.childForm.open();
    }

    _editChild(event) {
        const accountId = this._getRowId(event);
        const account = this.getChild(accountId);
        this.childForm.open(account);
    }

    _getRowId(event) {
        const accountRow = $(event.target).closest('.template-row');
        return accountRow.data('id');
    }

    _openDeleteModal(event) {
        const rowId = this._getRowId(event);
        this._confirmModal._openConfirm(this.childName, rowId);
    }

    updateChildren(child) {
        const index = this.model.children.findIndex(currentChild => child.id === currentChild.id);
        if (index === -1)
            this.model.addChild(child);
        else
            this.model.children[index] = child;
        this.updateTemplate(this.model);
    }

    _deleteChild(id) {
        const child = this.getChild(id);
        child.delete().then(() => {
            this.remoteChild(child);
            this.updateTemplate(this.model);
        });
    }

    remoteChild(child) {
        const index = this.model.children.findIndex(currentObject => currentObject.id === child.id);
        this.model.children.splice(index, 1);
    }

    getChild(id) {
        return this.model.children.find(object => object.id === Number(id));
    }
}