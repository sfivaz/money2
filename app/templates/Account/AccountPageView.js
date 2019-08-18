import {TransactionForm} from "../Transaction/TransactionForm";
import {TransactionRowView} from "../Transaction/TransactionRowView";
import {categoriesPromise} from "../../helpers/globalCategories";
import {Category} from "../../models/Category";
import {ModelPageView} from "../../shared/ModelPageView";

export class AccountPageView extends ModelPageView {

    constructor(account) {
        super(account);
        this.childForm = new TransactionForm(account => this.updateChildren(account));
        this._childName = 'transaction';
    }

    init() {
        AccountPageView.populateTypeFilter();
        AccountPageView.populateCategoryFilter();
        super.init();
    }

    eventHandlers() {
        super.eventHandlers();
        this._container.click(event => {
            if (event.target.id === 'btn-clean-filter')
                this._clearFilter();
            //TODO maybe I should isolate filters into another class
        });

        this._container.change(event => {
            if (event.target.id === 'iptDateFilter')
                this.filterByDate();
            else if (event.target.id === 'slcTypeFilter')
                this.filterByType(event.target.value);
            else if (event.target.id === 'slcCategoryFilter')
                this.filterByCategory(event.target, $("#cbxBudget").is(':checked'));
            else if (event.target.id === 'cbxBudget')
                this.toggleBudget(event.target.checked, $("#slcCategoryFilter"));
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

    updateChildren(child) {
        const index = this.model.children.findIndex(currentChild => child.id === currentChild.id);
        if (index === -1)
            this.model.addChild(child);
        else {
            if (child.sourceAccountId != this.model.id && child.destinationAccountId != this.model.id)
                this.model.removeChild(child);
            else
                this.model.changeChild(index, child);
        }
        this.updateTemplate(this.model);
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
        const select = $("#slcTypeFilter");
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

        const checkBox = $("#cbxBudget");

        if (id) {
            checkBox.removeAttr('disabled');
            this.model.filterCategory(category, useBudget);
        } else {
            checkBox.attr('disabled', 'disabled');
            checkBox.prop('checked', false);
            this._clearFilter("category");
        }
        this.updateTemplate(this.model);
    }

    static populateCategoryFilter() {
        const select = $("#slcCategoryFilter");
        categoriesPromise.then(categories => {
            const optionsHtml = [{id: '', name: 'select an option', budget: ''}].concat(categories)
                .map(category => `<option data-budget="${category.budget}" 
                    value="${category.id}">${category.name}</option>`);
            select.html(optionsHtml);
        });
    }

    toggleBudget(value, select) {
        if (value)
            this.filterByCategory(select, true);
        else
            this.filterByCategory(select);
    }

    _clearFilter(filter = "") {
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
        $("#slcTypeFilter").prop('selectedIndex', 0);
    }

    static cleanFilterCategory() {
        $("#slcCategoryFilter").prop('selectedIndex', 0);
        $("#cbxBudget").prop('checked', false);
    }
}