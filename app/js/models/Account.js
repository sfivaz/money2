import {Parent} from "./Parent";
import {API} from "../helpers/API";
import {Transaction} from "./Transaction";

export class Account extends Parent {

    constructor(...args) {
        super();
        this._name = args[0] || null;
        this._user_id = args[1] || null;
        this._id = args[2] || null;
        this._balance = args[3] || null;
        this._transactions = [];
        this._budget = 0;
    }

    getAPI() {
        return API + "accounts";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = Number(value);
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        this._budget = Number(value);
    }

    get children() {
        return this._transactions;
    }

    set children(value) {
        this._transactions = value;
        this.emit("children added");
    }

    get transactions() {
        return this.children;
    }

    set transactions(transactions) {
        let transactionsObject = [];
        transactions.forEach(transaction => {
            const transactionObject = Object.assign(new Transaction(), transaction);
            transactionsObject.push(transactionObject);
        });
        this.children = transactionsObject;
    }

    getBalanceFiltered() {
        const reducer = (total, transaction) => {
            if (transaction.filteredBy.length > 0)
                return total;
            else
                return total + this.getValue(transaction);
        };
        const balanceFiltered = this._transactions.reduce(reducer, 0) + this.budget;
        return balanceFiltered.toFixed(2);
    }

    getFullBalance() {
        const reducer = (total, transaction) => total + this.getValue(transaction);

        this._transactions.forEach(transaction => {
            console.log(transaction.value);
            // console.log(transaction.);
            console.log(this.getValue(transaction));
        });

        return this._transactions.reduce(reducer, 0).toFixed(2);
    }

    filterMonths(month, year) {
        const firstDate = getFirstDate(year, month).getTime();
        const lastDate = getLastDate(year, month).getTime();

        for (const transaction of this._transactions) {
            if (transaction.dateLong < firstDate || transaction.dateLong > lastDate)
                transaction.addFilter("month");
            else if (transaction.filteredBy.includes("month"))
                transaction.removeFilter("month");
        }
    }

    filterType(type) {
        for (const transaction of this._transactions) {
            if (transaction.type !== type)
                transaction.addFilter("type");
            else if (transaction.filteredBy.includes("type"))
                transaction.removeFilter("type");
        }
    }

    filterCategory(category_id, useBudget) {
        for (const transaction of this._transactions) {
            if (transaction.category_id !== category_id)
                transaction.addFilter("category");
            else if (transaction.filteredBy.includes("category"))
                transaction.removeFilter("category");
        }
        if (useBudget)
            this.budget = getCategory(category_id).budget;
        else
            this.budget = 0;

    }

    clearFilter(filter = null) {
        if (filter == null)
            this.clearAllFilters();
        else
            this._transactions.forEach(transaction => transaction.removeFilter(filter));
        if (filter === "category")
            this.budget = 0;
    }

    clearAllFilters() {
        this._transactions.forEach(transaction => transaction.filteredBy = []);
    }

    getValue(transaction) {
        switch (transaction.type) {
            case "income":
                return transaction.value;
            case "spending":
                return -1 * transaction.value;
            case "transfer":
                if (this.id === transaction.destinationAccountId)
                    return transaction.value;
                if (this.id === transaction.sourceAccountId)
                    return -1 * transaction.value;
        }
    }

    orderChildren() {
        this.children.sort((a, b) => b.dateLong - a.dateLong);
    }

    addChild(child) {
        this.children.push(child);
        this.orderChildren();
        this.emit("child added", child);
    }
}