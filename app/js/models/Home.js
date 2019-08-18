import {Parent} from "./Parent";

export class Home extends Parent {

    constructor(accounts) {
        super();
        this._accounts = accounts || [];
    }

    get children() {
        return this._accounts;
    }

    set children(value) {
        this._accounts = value;
    }

    totalFixed() {
        return this.getTotal().toFixed(2);
    }

    getTotal() {
        return this._accounts.reduce((total, account) =>
            total + account.balance, 0);
    }
}