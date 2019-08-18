import {Controller} from "./Controller";
import {Transaction} from "../models/Transaction";
import {$$} from "../helpers/myJQuery";
import {MyMoment} from "../helpers/myMoment";
import {TransactionView} from "../templates/Transaction/TransactionView";
import {TransactionController} from "./TransactionController";

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

                    monthText.textContent = MyMoment.getMonthTxt(previousMonth);

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
        super.load(this.model.id);
    }

    filterMonths(month, year) {
        this.model.filterMonths(month, year);
        this.showChildren();
        this.view.updateTemplate();
    }

    filterType(type) {
        this.model.filterType(type);
        this.showChildren();
        this.view.updateTemplate();
    }

    filterCategory(category_id, useBudget) {
        this.model.filterCategory(category_id, useBudget);
        this.showChildren();
        this.view.updateTemplate();
    }

    clearFilter(filter) {
        this.model.clearFilter(filter);
        this.showChildren();
        this.view.updateTemplate();
    }

    useBudget() {
        this.model.useBudget();
    }
}