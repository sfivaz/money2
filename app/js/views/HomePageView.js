import {AccountForm} from "./Account/AccountForm";
import {AccountRowView} from "./Account/AccountRowView";

export class HomePageView {

    constructor(home) {
        this.container = $("main");
        this.home = home;
        this.update(this.home);
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

    update(home) {
        this.container.html(this.template(home));
    }

    createChildTemplate() {

        const template = AccountForm.template();

        template.title.textContent = "create account";
        template.btnSubmit.textContent = "create";

        template.btnSubmit.addEventListener("click", () => {
            this.emit("create child", template.iptName.value);
            template.form.parentElement.removeChild(template.form);
        });
    }
}