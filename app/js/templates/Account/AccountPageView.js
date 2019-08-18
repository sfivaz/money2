import {TransactionForm} from "../Transaction/TransactionForm";
import {ConfirmDeleteModal} from "../../../shared/ConfirmDeleteModal";
import {TransactionRowView} from "../Transaction/TransactionRowView";

export class AccountPageView {

    constructor(account) {
        this._container = $(".page");
        this._main = $("main");
        this.model = account;
        this.childForm = new TransactionForm(account => this.updateChildren(account));
        this._confirmModal = new ConfirmDeleteModal(id => this._deleteChild(id));
        this._init();
    }

    _init() {
        this.updateTemplate(this.model);
        this._eventHandlers();
    }

    _eventHandlers() {
        this._container.click(event => {
            const button = $(event.target).closest('button');
            if (button.attr('id') === 'btn-create-child')
                this._createChild();
            else if (button.hasClass('row-btn-edit'))
                this._editChild(event);
            else if (button.hasClass('row-btn-del'))
                this._openDeleteModal(event);
            else if (button.attr('id') === 'btn-clean-filter')
                this._clearFilter();
        });
    }

    template(account) {
        return `
            <div class="d-flex justify-content-between">
                <h2>${account.name}</h2><h2>${account.fullBalance}</h2>
            </div>
            ${this.addFilterBar()}
            <div>${this.listTemplate(account.children)}</div>
        `;
    }

    listTemplate(children) {
        return children.map(child =>
            TransactionRowView.template(child)).join('');
    }

    updateTemplate(home) {
        this._main.html(this.template(home));
    }

    _createChild() {
        this.childForm.open();
    }

    _editChild(event) {
        const accountId = AccountPageView._getAccountId(event);
        const account = this.getChild(accountId);
        this.childForm.open(account);
    }

    _openDeleteModal(event) {
        const accountId = AccountPageView._getAccountId(event);
        this._confirmModal._openConfirm('account', accountId);
    }

    static _getAccountId(event) {
        const accountRow = $(event.target).closest('.template-row');
        return accountRow.data('id');
    }

    updateChildren(child) {
        const index = this.model.children.findIndex(currentChild => child.id === currentChild.id);
        if (index === -1)
            this.model.addChild(child);
        else {
            if (child.sourceAccountId != this.model.id && child.destinationAccountId != this.model.id)
                this.remoteChild(child);
            else
                this.model.children[index] = child;
        }
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

    addFilterBar() {
        return `
            <div class="filter-bar pb-2">
                ${AccountPageView.addMonthFilter()}
                <button class="btn-clean-filter btn btn-sm btn-secondary">clean filters</button>
                <h3 class="filtered-balance">${this.model.balanceFiltered}</h3>
            </div>
        `;
        // this.addTypeFilter();
        // this.addCategoryFilter();
    }

    static addMonthFilter() {
        return `
            <div class="filter-date d-flex">
                <label for="iptDateFilter" class="filter__label">Choose a month</label>
                <input type="month" id="iptDateFilter" class="filter__input form-control form-control-sm">
            </div>
        `;
        //TODO add min and max value based on the transactions's date in the account
        // this.elements.iptDateFilter.addEventListener("change", () => this.filterByDate());
    }

    //
    // addTypeFilter() {
    //     this.elements.typeFilter = $$("<div>");
    //     this.elements.lblTypeFilter = $$("<label>");
    //     this.elements.slcTypeFilter = $$("<select>");
    //
    //     this.elements.lblTypeFilter.textContent = "Choose a type";
    //     this.elements.lblTypeFilter.for = "iptTypeFilter";
    //     this.elements.slcTypeFilter.for = "iptTypeFilter";
    //
    //     this.elements.typeFilter.className = "filter-type d-flex";
    //     this.elements.lblTypeFilter.className = "filter__label";
    //     this.elements.slcTypeFilter.className = "filter__select custom-select custom-select-sm";
    //
    //     ["select an option", "spending", "income", "transfer"].forEach((type, key) =>
    //         this.elements.slcTypeFilter[key] = new Option(type, type));
    //     this.elements.slcTypeFilter.options[0].value = "";
    //
    //     this.elements.slcTypeFilter.addEventListener("change",
    //         () => this.filterByType(this.elements.slcTypeFilter.value));
    //
    //     this.elements.filterBar.appendChild(this.elements.typeFilter);
    //     this.elements.typeFilter.appendChild(this.elements.lblTypeFilter);
    //     this.elements.typeFilter.appendChild(this.elements.slcTypeFilter);
    // }
    //
    // addCategoryFilter() {
    //     this.elements.categoryFilter = $$("<div>");
    //     this.elements.lblCategoryFilter = $$("<label>");
    //     this.elements.slcCategoryFilter = $$("<select>");
    //     this.elements.lblBudget = $$("<label>");
    //     this.elements.cbxBudget = $$("<input>");
    //
    //     this.elements.lblCategoryFilter.textContent = "Choose a category";
    //     this.elements.lblCategoryFilter.for = "iptCategoryFilter";
    //     this.elements.slcCategoryFilter.for = "iptCategoryFilter";
    //     this.elements.lblBudget.textContent = "use Budget";
    //     this.elements.lblBudget.for = "cbxBudget";
    //     this.elements.cbxBudget.for = "cbxBudget";
    //     this.elements.cbxBudget.type = "checkbox";
    //
    //     this.elements.categoryFilter.className = "filter-category d-flex";
    //     this.elements.lblCategoryFilter.className = "filter__label";
    //     this.elements.slcCategoryFilter.className = "filter__select custom-select custom-select-sm";
    //
    //     new Category().findAll()
    //         .then(categories => {
    //             [{name: "select an option", id: ""}].concat(categories).forEach((category, key) =>
    //                 this.elements.slcCategoryFilter[key] = new Option(category.name, category.id));
    //
    //             this.elements.slcCategoryFilter.addEventListener("change",
    //                 () => {
    //                     this.filterByCategory(this.elements.slcCategoryFilter.value, this.elements.cbxBudget.checked);
    //                     this.elements.cbxBudget.disabled = (this.elements.slcCategoryFilter.value === "");
    //                 });
    //
    //             this.elements.cbxBudget.disabled = (this.elements.slcCategoryFilter.value === "");
    //
    //             this.elements.cbxBudget.addEventListener("change",
    //                 () => this.toggleBudget(this.elements.cbxBudget.checked, this.elements.slcCategoryFilter.value));
    //
    //
    //             this.elements.filterBar.appendChild(this.elements.categoryFilter);
    //             this.elements.categoryFilter.appendChild(this.elements.lblCategoryFilter);
    //             this.elements.categoryFilter.appendChild(this.elements.slcCategoryFilter);
    //             this.elements.categoryFilter.appendChild(this.elements.lblBudget);
    //             this.elements.categoryFilter.appendChild(this.elements.cbxBudget);
    //         });
    // }
    //
    _clearFilter(filter = null) {
        // if (filter === "type")
        //     this.elements.slcTypeFilter.options[0].selected = true;
        // else if (filter === "month")
        //     this.elements.iptDateFilter.value = "";
        // else if (!filter) {
        //     this.elements.iptDateFilter.value = "";
        //     this.elements.slcTypeFilter.options[0].selected = true;
        //     this.elements.slcCategoryFilter.options[0].selected = true;
        // }
        // this.emit("clear filter", filter);
    }

    //
    // filterByDate() {
    //     //the input type="month" returns the value in this format: YYYY-MM
    //     //then it's converted to the format [YYYY, MM]
    //     //the -1 is because of the way the month is calculated (0 to 11) instead of 1 to 12
    //     const date = this.elements.iptDateFilter.value.split('-');
    //     this.emit("filter by date", date[1] - 1, date[0]);
    // }
    //
    // filterByType(type) {
    //     if (type)
    //         this.emit("filter by type", type);
    //     else
    //         this._clearFilter("type");
    // }
    //
    // filterByCategory(category_id, useBudget = false) {
    //     if (category_id)
    //         this.emit("filter by category", category_id, useBudget);
    //     else
    //         this._clearFilter("category");
    // }
    //
    // toggleBudget(value, category_id) {
    //     if (value)
    //         this.filterByCategory(category_id, true);
    //     else
    //         this.filterByCategory(category_id);
    // }

    // _createChild() {
    //
    //     let template = TransactionForm.template();
    //
    //     template.title.textContent = "create transaction";
    //     template.btnSubmit.textContent = "create";
    //
    //     template.iptDate.value = MyMoment.now();
    //
    //     new Account().findAll().then(accounts => {
    //         accounts.forEach((account, key) => {
    //             template.slcAccountOrigin[key] = new Option(account.name, account.id, false,
    //                 account.id === this.model.id);
    //
    //             template.slcAccountDestiny[key] = new Option(account.name, account.id);
    //         });
    //     });
    //
    //     new Category().findAll().then(categories => {
    //         categories.forEach((category, key) => {
    //             template.slcCategory[key] = new Option(category.name, category.id);
    //         });
    //     });
    //
    //     template.btnSubmit.addEventListener("click", () => {
    //
    //         //if no description was added use the category as a description
    //         if (template.iptDescription.value === "") {
    //             const category = getCategory(template.slcCategory.value);
    //             template.iptDescription.value = category.name;
    //         }
    //
    //         this.emit("create child",
    //             template.slcType.value,
    //             template.iptDescription.value,
    //             template.iptValue.value,
    //             template.iptDate.value,
    //             template.slcAccountOrigin.value,
    //             template.slcAccountDestiny.value,
    //             template.slcCategory.value
    //         );
    //         template.form.parentElement.removeChild(template.form);
    //     });
    // }
}