import {Parent} from "./Parent";

export class Categories extends Parent {

    constructor(categories) {
        super();
        this._categories = categories || [];
    }

    get children() {
        return this._categories;
    }

    set children(value) {
        this._categories = value;
    }
}