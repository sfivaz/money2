import {AccountForm} from "./Account/AccountForm";
import {AccountRowView} from "./Account/AccountRowView";
import {ModelPageView} from "../shared/ModelPageView";

export class HomePageView extends ModelPageView {

    constructor(home) {
        super(home);
        this.childForm = new AccountForm(account => this.updateChildren(account));
        this.childName = 'account';
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
        return accounts.map(account =>
            AccountRowView.template(account))
            .join('');
    }

    updateTemplate(home) {
        this._list.html(this.template(home));
    }
}