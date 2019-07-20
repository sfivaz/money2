class CategoryRowView extends RowView {

    template() {

        this.elements = this.templateRow();

        this.elements.name = $$("<span>");
        this.elements.budget = $$("<span>");

        this.elements.row.className += " clr-account";
        this.elements.name.className = "name f-9";
        this.elements.name.className = "budget f-1";

        this.update();

        this.elements.main.appendChild(this.elements.name);
        this.elements.main.appendChild(this.elements.budget);

        return this.elements.row;
    }

    update() {
        this.elements.name.textContent = this.model.name;
        this.elements.budget.textContent = this.model.budget;
    }

    editTemplate() {

        const template = CategoryForm.template();

        template.title.textContent = "edit category";
        template.btnSubmit.textContent = "edit";

        template.iptName.value = this.model.name;
        template.iptBudget.value = this.model.budget;

        template.btnSubmit.addEventListener("click", () => {
            this.emit("edit model", template.iptName.value, template.iptBudget.value);
            template.form.parentElement.removeChild(template.form);
        });
    }

    confirmDelete() {
        this.confirmTemplateDelete("category");
    }
}