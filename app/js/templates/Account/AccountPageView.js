import {TransactionForm} from "../Transaction/TransactionForm";
import {ConfirmDeleteModal} from "../../../shared/ConfirmDeleteModal";
import {TransactionRowView} from "../Transaction/TransactionRowView";
import {categoriesPromise} from "../../helpers/globalCategories";
import {Category} from "../../models/Category";

export class AccountPageView {

    constructor(account) {
        this._container = $(".page");
        this._list = $("#list");
        this.model = account;
        this.childForm = new TransactionForm(account => this.updateChildren(account));
        this._confirmModal = new ConfirmDeleteModal(id => this._deleteChild(id));
        this._init();
    }

    _init() {
        AccountPageView.populateTypeFilter();
        AccountPageView.populateCategoryFilter();
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
            //TODO maybe I should isolate filters into another class
        });

        this._container.change(event => {
            if (event.target.id === 'iptDateFilter')
                this.filterByDate();
            else if (event.target.id === 'iptTypeFilter')
                this.filterByType(event.target.value);
            else if (event.target.id === 'iptCategoryFilter')
                this.filterByCategory(event.target, $("#cbxBudget").is(':checked'));
            else if (event.target.id === 'cbxBudget')
                this.toggleBudget(event.target.checked, $("#iptCategoryFilter").val());
        });
    }

    template(account) {
        return this.listTemplate(account.children);
    }

    listTemplate(children) {
        children = children.filter(child => child.filteredBy.length === 0);

        return children.map(child =>
            TransactionRowView.template(child)).join('');
    }

    updateTemplate(account) {
        AccountPageView._updateHeader(account);
        this._list.html(this.template(account));
    }

    static _updateHeader(account) {
        $("#account-name").text(account.name);
        $("#account-full-balance").text(account.fullBalance);
        $("#filtered-balance").text(account.filteredBalance);
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

    filterByDate() {
        //the input type="month" returns the value in this format: YYYY-MM
        //then it's converted to the format [YYYY, MM]
        //the -1 is because of the way the month is calculated (0 to 11) instead of 1 to 12
        const date = $("#iptDateFilter").val().split('-');
        this.model.filterMonths(date[1] - 1, date[0]);
        this.updateTemplate(this.model);
    }

    filterByType(type) {
        if (type)
            this.model.filterType(type);
        else
            this._clearFilter("type");
        this.updateTemplate(this.model);
    }

    static populateTypeFilter() {
        const select = $("#iptTypeFilter");
        const types = ["spending", "income", "transfer"];

        const optionsHtml = ['select an option'].concat(types)
            .map((type, index) => `<option value="${index > 0 ? type : ''}">${type}</option>`);

        select.html(optionsHtml);
    }

    filterByCategory(select, useBudget = false) {
        const option = ($(select).children('option:selected'));
        const id = option.val();
        const budget = option.data('budget');
        const category = new Category(id, null, budget);

        if (id) {
            // $("#cbxBudget").removeAttr('disabled');
            this.model.filterCategory(category, useBudget);
        } else {
            // $("#cbxBudget").attr('disabled', 'disabled');
            // $("#cbxBudget").prop('checked', false);
            this._clearFilter("category");
        }
        this.updateTemplate(this.model);
    }

    static populateCategoryFilter() {
        const select = $("#iptCategoryFilter");
        categoriesPromise.then(categories => {
            const optionsHtml = [{id: '', name: 'select an option', budget: ''}].concat(categories)
                .map(category => `<option data-budget="${category.budget}" 
                    value="${category.id}">${category.name}</option>`);
            select.html(optionsHtml);
        });
    }

    toggleBudget(value, category_id) {
        if (value)
            this.filterByCategory(category_id, true);
        else
            this.filterByCategory(category_id);
    }

    _clearFilter(filter = null) {
        switch (filter) {
            case "type":
                AccountPageView.cleanFilterType();
                break;
            case "month":
                AccountPageView.cleanFilterDate();
                break;
            case "category":
                AccountPageView.cleanFilterCategory();
                break;
            default:
                AccountPageView.cleanFilterDate();
                AccountPageView.cleanFilterType();
                AccountPageView.cleanFilterCategory();
        }
        this.model.clearFilter(filter);
    }

    static cleanFilterDate() {
        $("#slcDateFilter").val('');
    }

    static cleanFilterType() {
        $("#slcTypeFilter option:nth-child(1)").attr('selected', 'selected');
    }

    static cleanFilterCategory() {
        $("#slcCategoryFilter option:nth-child(1)").attr('selected', 'selected');
        $("#cbxBudget").removeAttr('checked');
    }

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