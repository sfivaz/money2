import {AccountForm} from "./Account/AccountForm";
import {AccountRowView} from "./Account/AccountRowView";

export class HomePageView {

    constructor(model) {
        this.container = $("main");
        this.model = model;
        this.update(this.model);
    }

    template(model) {
        return `
            <div class="d-flex justify-content-between">
                <h2>Accounts</h2><h2>${model.totalFixed()}</h2>
            </div>
            <div>${AccountRowView.template(model.accounts)}</div>
        `;
    }

    update(model) {
        this.container.html(this.template(model));
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