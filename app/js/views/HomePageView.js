import {AccountForm} from "./Account/AccountForm";
import {AccountRowView} from "./Account/AccountRowView";

export class HomePageView {

    constructor(home) {
        this._container = $(".page");
        this._main = $("main");
        this.home = home;
        this.childForm = new AccountForm(account => this.updateChildren(account));
        this._init();
    }

    _init() {
        this.updateTemplate(this.home);
        this._eventHandlers();
    }

    _eventHandlers() {
        this._container.click(event => {
            const button = $(event.target).closest('button');
            if (button.attr('id') === 'btn-create-child') {
                this.createChildTemplate();
            } else if (button.hasClass('btn-edit-row')) {
                const accountRow = $(event.target).closest('.row');
                const accountId = accountRow.data('id');
                console.log(accountId);
            } else if (button.hasClass('btn-delete-row')) {

            }
        });
    }

    template(home) {
        return `
            <div class="d-flex justify-content-between">
                <h2>Accounts</h2><h2>${home.totalFixed()}</h2>
            </div>
            <div>${this.listTemplate(home.children)}</div>
        `;
    }

    listTemplate(accounts) {
        return accounts.map(account => {
            return AccountRowView.template(account);
        }).join('');
    }

    updateTemplate(home) {
        this._main.html(this.template(home));
    }

    createChildTemplate() {
        this.childForm.open();
    }

    updateChildren(child) {
        const index = this.home.children.findIndex(currentChild => child.id == currentChild.id);
        if (index === -1)
            this.home.addChild(child);
        else
            this.home._accounts[index] = child;
        this.updateTemplate(this.home);
    }
}