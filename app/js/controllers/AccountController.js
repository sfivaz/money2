import {Controller} from "./Controller";
import {Transaction} from "../models/Transaction";

export class AccountController extends Controller {

    constructor(model = null, view = null) {
        super(model, view);

        if (view) {
            this.view.on("filter by date", (month, year) => this.filterMonths(month, year));
            this.view.on("filter by type", type => this.filterType(type));
            this.view.on("filter by category", (category_id, useBudget) => this.filterCategory(category_id, useBudget));
            this.view.on("use budget", () => this.useBudget());
            this.view.on("clear filter", filter => this.clearFilter(filter));
        }
    }

    static get childClass() {
        return Transaction;
    }

    static get childControllerClass() {
        return TransactionController;
    }

    static get childViewClass() {
        return TransactionView;
    }

    //TODO put this in the view
    showChildren() {
        this.view.clearAll();
        let previousMonth = 12;
        this.model.children.forEach(transaction => {
            if (transaction.filteredBy.length === 0) {
                if (previousMonth > transaction.date.getMonth() + 1) {
                    previousMonth = transaction.date.getMonth() + 1;
                    const monthContainer = $$("<div>");
                    const monthText = $$("<span>");

                    monthText.textContent = getMonthTxt(previousMonth);

                    monthContainer.appendChild(monthText);
                    this.view.elements.main.appendChild(monthContainer);
                }
                this.view.showChild(this.getChildView(transaction));
            }
        });
    }

    edit(elements) {
        this.model.name = elements[0];
        this.model.save();
    }

    load() {
        super.load({account_id: this.model.id});
    }

    filterMonths(month, year) {
        this.model.filterMonths(month, year);
        this.showChildren();
        this.view.update();
    }

    filterType(type) {
        this.model.filterType(type);
        this.showChildren();
        this.view.update();
    }

    filterCategory(category_id, useBudget) {
        this.model.filterCategory(category_id, useBudget);
        this.showChildren();
        this.view.update();
    }

    clearFilter(filter) {
        this.model.clearFilter(filter);
        this.showChildren();
        this.view.update();
    }

    useBudget() {
        this.model.useBudget();
    }
}