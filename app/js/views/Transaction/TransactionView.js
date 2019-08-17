import {RowView} from "../RowView";
import {$$} from "../../helpers/myJQuery";
import {TransactionForm} from "./TransactionForm";
import {Category} from "../../models/Category";
import {Account} from "../../models/Account";
import {getCurrentAccount} from "../../helpers/accountHelper";
import {getCategory} from "../../helpers/categoriesHelper";
import {categoriesPromise} from "../../helpers/globals";

export class TransactionView extends RowView {

    templateRow() {

        const elements = {
            row: $$("<div>"),
            btnEdit: $$("<button>"),
            btnDel: $$("<button>"),
            icnDel: $$("<i>"),
            icnEdit: $$("<i>")
        };

        elements.row.className = "template-row";
        elements.btnEdit.className = "row-btn-edit btn-edit btn btn-primary";
        elements.icnEdit.className = "fa fa-pencil-square-o";
        elements.btnDel.className = "row-btn-del btn-delete btn btn-danger";
        elements.icnDel.className = "fa fa-trash-o";

        elements.btnEdit.addEventListener("click", () => this.editTemplate());
        elements.btnDel.addEventListener("click", () => this.confirmDelete());

        elements.row.appendChild(elements.btnEdit);
        elements.btnEdit.appendChild(elements.icnEdit);
        elements.row.appendChild(elements.btnDel);
        elements.btnDel.appendChild(elements.icnDel);

        return elements;
    }

    template() {
        this.elements = this.templateRow();

        this.elements.date = $$("<span>");
        this.elements.category = $$("<span>");
        this.elements.description = $$("<span>");
        this.elements.value = $$("<span>");

        this.elements.date.className = "row-date";
        this.elements.category.className = "row-category";
        this.elements.description.className = "row-description";
        this.elements.value.className = "row-value";

        this.update();

        this.elements.row.appendChild(this.elements.date);
        this.elements.row.appendChild(this.elements.category);
        this.elements.row.appendChild(this.elements.description);
        this.elements.row.appendChild(this.elements.value);

        return this.elements.row;
    }

    update() {
        if (this.model.type === "transfer") {
            if (this.model.sourceAccountId === getCurrentAccount())
                this.elements.row.className += " clr-transfer-source";
            else
                this.elements.row.className += " clr-transfer-destiny";
        } else
            this.elements.row.className += " clr-" + this.model.type.toLowerCase();

        this.elements.date.textContent = this.model.dateFormattedFR;
        this.model.getCategory().then(categoryName => {
            this.elements.category.textContent = categoryName;
        });
        this.elements.description.textContent = this.model.description;
        this.elements.value.textContent = this.model.value.toFixed(2);
    }

    editTemplate() {
        let template = TransactionForm.template();

        template.title.textContent = "edit transaction";
        template.btnSubmit.textContent = "edit";
        template.iptDescription.value = this.model.description;
        template.iptValue.value = this.model.value;
        template.iptDate.value = this.model.dateFormattedEN;

        //TODO use enum
        ["spending", "income", "transfer"].forEach((type, key) =>
            template.slcType[key] = new Option(type, type, null, type === this.model.type));

        template.slcAccountDestiny.disabled = (template.slcType.value !== "transfer");

        /**
         * @var accounts Array
         */
        new Account().findAll().then(accounts => {
            accounts.forEach((account, key) => {
                template.slcAccountOrigin[key] = new Option(account.name, account.id, false,
                    account.id == this.model.sourceAccountId);
                template.slcAccountDestiny[key] = new Option(account.name, account.id, false,
                    account.id == this.model.destinationAccountId);
            });
        });
        /**
         * @var categories Array
         */
        categoriesPromise.then(categories => {
            categories.forEach((category, key) => {
                template.slcCategory[key] = new Option(category.name, category.id, false,
                    category.id == this.model.categoryId);
            });
        });

        template.btnSubmit.addEventListener("click", () => {

            if (template.iptDescription.value === "") {
                const category = getCategory(template.slcCategory.value);
                template.iptDescription.value = category.name;
            }

            this.emit("edit model",
                template.slcType.value,
                template.iptDescription.value,
                template.iptValue.value,
                template.iptDate.value,
                template.slcAccountOrigin.value,
                template.slcAccountDestiny.value,
                template.slcCategory.value
            );
            template.form.parentElement.removeChild(template.form);
        });
    }

    confirmDelete() {
        this.confirmTemplateDelete("transaction");
    }
}
