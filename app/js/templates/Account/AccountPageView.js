import {PageView} from "../PageView";
import {$$} from "../../helpers/myJQuery";
import {Category} from "../../models/Category";
import {TransactionForm} from "../Transaction/TransactionForm";
import {MyMoment} from "../../helpers/myMoment";
import {Account} from "../../models/Account";

export class AccountPageView extends PageView {

    constructor(model) {
        super(model);
    }

    template() {

        this.addToNavBar();
        this.elements = PageView.pageTemplate("New Transaction");

        this.elements.header.className = "";

        this.addHeaderInfo();
        this.addFilterBar();

        this.update();

        return this.elements.template;
    }

    /**
     * this method adds the name of the account in the navbar
     */
    addToNavBar() {
        const link = $$("<a>");
        link.className = "nav-item nav-link";
        //TODO remove /money
        link.href = "/money/account/" + this.model.id;
        link.textContent = this.model.name;
        $$(".navbar-nav").appendChild(link);
    }

    addFilterBar() {
        this.elements.filterBar = $$("<div>");
        this.elements.btnClearFilter = $$("<button>");
        this.elements.filteredBalance = $$("<h3>");

        this.elements.filterBar.className = "filter-bar";
        this.elements.btnClearFilter.className = "btn-filter-clear btn btn-sm btn-secondary";
        this.elements.filteredBalance.className = "filtered-balance";

        this.elements.btnClearFilter.innerText = "clean filters";

        this.elements.btnClearFilter.addEventListener("click", () => this.clearFilter());

        this.elements.header.appendChild(this.elements.filterBar);
        this.addMonthFilter();
        this.addTypeFilter();
        this.addCategoryFilter();
        this.elements.filterBar.appendChild(this.elements.btnClearFilter);
        this.elements.filterBar.appendChild(this.elements.filteredBalance);
    }

    addMonthFilter() {
        this.elements.dateFilter = $$("<div>");
        this.elements.lblDateFilter = $$("<label>");
        this.elements.iptDateFilter = $$("<input>");

        this.elements.lblDateFilter.textContent = "Choose a month";
        this.elements.lblDateFilter.for = "iptDateFilter";
        this.elements.iptDateFilter.for = "iptDateFilter";
        this.elements.iptDateFilter.type = "month";
        //TODO add min and max value based on the transactions's date in the account

        this.elements.dateFilter.className = "filter-date d-flex";
        this.elements.lblDateFilter.className = "filter__label";
        this.elements.iptDateFilter.className = "filter__input form-control form-control-sm";

        this.elements.iptDateFilter.addEventListener("change", () => this.filterByDate());

        this.elements.filterBar.appendChild(this.elements.dateFilter);
        this.elements.dateFilter.appendChild(this.elements.lblDateFilter);
        this.elements.dateFilter.appendChild(this.elements.iptDateFilter);
    }

    addTypeFilter() {
        this.elements.typeFilter = $$("<div>");
        this.elements.lblTypeFilter = $$("<label>");
        this.elements.slcTypeFilter = $$("<select>");

        this.elements.lblTypeFilter.textContent = "Choose a type";
        this.elements.lblTypeFilter.for = "iptTypeFilter";
        this.elements.slcTypeFilter.for = "iptTypeFilter";

        this.elements.typeFilter.className = "filter-type d-flex";
        this.elements.lblTypeFilter.className = "filter__label";
        this.elements.slcTypeFilter.className = "filter__select custom-select custom-select-sm";

        ["select an option", "spending", "income", "transfer"].forEach((type, key) =>
            this.elements.slcTypeFilter[key] = new Option(type, type));
        this.elements.slcTypeFilter.options[0].value = "";

        this.elements.slcTypeFilter.addEventListener("change",
            () => this.filterByType(this.elements.slcTypeFilter.value));

        this.elements.filterBar.appendChild(this.elements.typeFilter);
        this.elements.typeFilter.appendChild(this.elements.lblTypeFilter);
        this.elements.typeFilter.appendChild(this.elements.slcTypeFilter);
    }

    addCategoryFilter() {
        this.elements.categoryFilter = $$("<div>");
        this.elements.lblCategoryFilter = $$("<label>");
        this.elements.slcCategoryFilter = $$("<select>");
        this.elements.lblBudget = $$("<label>");
        this.elements.cbxBudget = $$("<input>");

        this.elements.lblCategoryFilter.textContent = "Choose a category";
        this.elements.lblCategoryFilter.for = "iptCategoryFilter";
        this.elements.slcCategoryFilter.for = "iptCategoryFilter";
        this.elements.lblBudget.textContent = "use Budget";
        this.elements.lblBudget.for = "cbxBudget";
        this.elements.cbxBudget.for = "cbxBudget";
        this.elements.cbxBudget.type = "checkbox";

        this.elements.categoryFilter.className = "filter-category d-flex";
        this.elements.lblCategoryFilter.className = "filter__label";
        this.elements.slcCategoryFilter.className = "filter__select custom-select custom-select-sm";

        new Category().findAll()
            .then(categories => {
                [{name: "select an option", id: ""}].concat(categories).forEach((category, key) =>
                    this.elements.slcCategoryFilter[key] = new Option(category.name, category.id));

                this.elements.slcCategoryFilter.addEventListener("change",
                    () => {
                        this.filterByCategory(this.elements.slcCategoryFilter.value, this.elements.cbxBudget.checked);
                        this.elements.cbxBudget.disabled = (this.elements.slcCategoryFilter.value === "");
                    });

                this.elements.cbxBudget.disabled = (this.elements.slcCategoryFilter.value === "");

                this.elements.cbxBudget.addEventListener("change",
                    () => this.toggleBudget(this.elements.cbxBudget.checked, this.elements.slcCategoryFilter.value));


                this.elements.filterBar.appendChild(this.elements.categoryFilter);
                this.elements.categoryFilter.appendChild(this.elements.lblCategoryFilter);
                this.elements.categoryFilter.appendChild(this.elements.slcCategoryFilter);
                this.elements.categoryFilter.appendChild(this.elements.lblBudget);
                this.elements.categoryFilter.appendChild(this.elements.cbxBudget);
            });
    }

    clearFilter(filter = null) {
        if (filter === "type")
            this.elements.slcTypeFilter.options[0].selected = true;
        else if (filter === "month")
            this.elements.iptDateFilter.value = "";
        else if (!filter) {
            this.elements.iptDateFilter.value = "";
            this.elements.slcTypeFilter.options[0].selected = true;
            this.elements.slcCategoryFilter.options[0].selected = true;
        }
        this.emit("clear filter", filter);
    }

    filterByDate() {
        //the input type="month" returns the value in this format: YYYY-MM
        //then it's converted to the format [YYYY, MM]
        //the -1 is because of the way the month is calculated (0 to 11) instead of 1 to 12
        const date = this.elements.iptDateFilter.value.split('-');
        this.emit("filter by date", date[1] - 1, date[0]);
    }

    filterByType(type) {
        if (type)
            this.emit("filter by type", type);
        else
            this.clearFilter("type");
    }

    filterByCategory(category_id, useBudget = false) {
        if (category_id)
            this.emit("filter by category", category_id, useBudget);
        else
            this.clearFilter("category");
    }

    toggleBudget(value, category_id) {
        if (value)
            this.filterByCategory(category_id, true);
        else
            this.filterByCategory(category_id);
    }

    /**
     * this method creates the header with the name and the total
     */
    addHeaderInfo() {
        this.elements.headerInfo = $$("<div>");
        this.elements.name = $$("<h2>");
        this.elements.initial_balance = $$("<h2>");

        this.elements.headerInfo.className = "d-flex justify-content-between";

        this.elements.header.appendChild(this.elements.headerInfo);
        this.elements.headerInfo.appendChild(this.elements.name);
        this.elements.headerInfo.appendChild(this.elements.initial_balance);
    }

    /**
     * This method updates the data shown in the the header of the page based on the model's data
     */
    update() {
        this.updateHeader();
    };

    updateHeader() {
        this.elements.name.textContent = this.model.name;
        this.elements.initial_balance.textContent = this.model.getFullBalance();
        this.elements.filteredBalance.textContent = this.model.getBalanceFiltered();
    };

    createChildTemplate() {

        let template = TransactionForm.template();

        template.title.textContent = "create transaction";
        template.btnSubmit.textContent = "create";

        template.iptDate.value = MyMoment.now();

        new Account().findAll().then(accounts => {
            accounts.forEach((account, key) => {
                template.slcAccountOrigin[key] = new Option(account.name, account.id, false,
                    account.id === this.model.id);

                template.slcAccountDestiny[key] = new Option(account.name, account.id);
            });
        });

        new Category().findAll().then(categories => {
            categories.forEach((category, key) => {
                template.slcCategory[key] = new Option(category.name, category.id);
            });
        });

        template.btnSubmit.addEventListener("click", () => {

            //if no description was added use the category as a description
            if (template.iptDescription.value === "") {
                const category = getCategory(template.slcCategory.value);
                template.iptDescription.value = category.name;
            }

            this.emit("create child",
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
}