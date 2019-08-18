export class AccountRowView {

    static template(account) {

        return `
            <div class="row align-items-center clr-account">
                <div class="row-main">
                    <span class="name f-9">${account.name}</span>
                    <span class="balance f-1">${account.balance.toFixed(2)}</span>
                </div>
                <aside class="row-aside">
                    <button class="btn-edit btn btn-primary mr-3"><i class="fa fa-pencil-square-o"></i></button>
                    <button class="btn-delete btn btn-danger mr-3"><i class="fa fa-trash-o"></i></button>
                </aside>
            </div>
        `;

        // elements.btnEdit.addEventListener("click", () => this.editTemplate());
        // elements.btnDel.addEventListener("click", () => this.confirmDelete());
        // this.elements.main.addEventListener("click", () => window.location.href = "account/" + this.model.id);
    }

    // editTemplate() {
    //
    //     const template = AccountForm.template();
    //
    //     template.title.textContent = "edit account";
    //     template.btnSubmit.textContent = "edit";
    //
    //     template.iptName.value = this.model.name;
    //
    //     template.btnSubmit.addEventListener("click", () => {
    //
    //         this.emit("edit model", template.iptName.value);
    //
    //         template.form.parentElement.removeChild(template.form);
    //     });
    //
    // }
    //
    // confirmDelete() {
    //     this.confirmTemplateDelete("account");
    // }
}