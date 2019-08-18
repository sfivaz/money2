import {Parent} from "./Parent";
import {API} from "../helpers/API";
import {Transaction} from "./Transaction";
import {MyMoment} from "../helpers/myMoment";
import {dateFormatEN, dateFormatFR} from "../helpers/dateGlobal";

export class Account extends Parent {

    constructor(id, name, balance, transactions, user_id, budget) {
        super();
        this._id = Number(id);
        this._name = name;
        this._balance = Number(balance) || 0;
        this._user_id = Number(user_id);
        this._budget = Number(budget) || 0;
    }

    getAPI() {
        return API + "accounts";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = Number(value);
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
        this._user_id = Number(value);
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

    get filteredBalance() {
        const reducer = (total, transaction) => {
            if (transaction.filteredBy.length > 0)
                return total;
            else
                return total + this.getValue(transaction);
        };
        const balanceFiltered = this._transactions.reduce(reducer, 0) + this.budget;
        return balanceFiltered.toFixed(2);
    }

    get fullBalance() {
        const reducer = (total, transaction) => total + this.getValue(transaction);
        return this._transactions.reduce(reducer, 0).toFixed(2);
    }

    filterMonths(month, year) {
        const firstDay = moment(`${year}-${month}-01`, dateFormatEN);
        const lastDay = firstDay.clone().endOf('month');
        console.log(firstDay.format(dateFormatFR));
        console.log(lastDay.format(dateFormatFR));

        this._transactions.forEach(transaction => {
            if (transaction.dateLong < firstDay || transaction.dateLong > lastDay)
                transaction.addFilter("month");
            else if (transaction.filteredBy.includes("month"))
                transaction.removeFilter("month");
        });
    }

    filterType(type) {
        for (const transaction of this._transactions) {
            if (transaction.type !== type)
                transaction.addFilter("type");
            else if (transaction.filteredBy.includes("type"))
                transaction.removeFilter("type");
        }
    }

    filterCategory(category, useBudget) {
        this._transactions.forEach(transaction => {
            if (transaction.categoryId !== category.id)
                transaction.addFilter("category");
            //TODO maybe this second check is useless
            else if (transaction.filteredBy.includes("category"))
                transaction.removeFilter("category");
        });
        this.budget = useBudget ? category.budget : 0;
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
    }
}