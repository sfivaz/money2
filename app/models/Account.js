import {Parent} from "./Parent";
import {Transaction} from "./Transaction";
import {HttpService} from "../services/HttpService";
import {TokenService} from "../services/TokenService";

export class Account extends Parent {

    constructor(id, name, balance, transactions, userId, budget) {
        super();
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.userId = userId;
        this.budget = budget;
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

    get userId() {
        return this._user_id;
    }

    set userId(value) {
        this._user_id = Number(value);
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = Number(value || 0);
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        this._budget = Number(value || 0);
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
        this._transactions = transactions.map(transaction =>
            Object.assign(new Transaction(), transaction));
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
        const date = moment().month(month).year(year);
        const firstDay = date.clone().startOf('month');
        const lastDay = date.clone().endOf('month');

        this._transactions.forEach(transaction => {
            if (moment(transaction.date) < firstDay || moment(transaction.date) > lastDay)
                transaction.addFilter("month");
            else
                transaction.removeFilter("month");
        });
    }

    filterType(type) {
        this._transactions.forEach(transaction => {
            if (transaction.type !== type)
                transaction.addFilter("type");
            else
                transaction.removeFilter("type");
        });
    }

    filterCategory(category, useBudget) {
        this._transactions.forEach(transaction => {
            if (transaction.categoryId !== category.id)
                transaction.addFilter("category");
            else
                transaction.removeFilter("category");
        });
        this.budget = useBudget ? category.budget : 0;
    }

    clearFilter(filter = null) {
        //TODO filter == null? why not (!filter)
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
        this.children.sort((a, b) => b.date.toDate() - a.date.toDate());
    }

    addChild(child) {
        this.children.push(child);
        this.orderChildren();
    }

    getAPI() {
        return super.getAPI() + 'accounts';
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            balance: this.balance,
            userId: this.userId,
            budget: this.budget
        };
    }
}