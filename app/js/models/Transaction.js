import {ORM} from "./ORM";
import {API} from "../helpers/API";
import {MyMoment} from "../helpers/myMoment";
import {Category} from "./Category";

export class Transaction extends ORM {

    constructor(id, description, type, value, categoryId, date, sourceAccountId, destinationAccountId) {
        super();
        this._id = id;
        this._description = description;
        this._type = type;
        this._value = value;
        this._categoryId = categoryId;
        this._date = new Date(date);
        this._sourceAccountId = sourceAccountId;
        this._destinationAccountId = destinationAccountId;
        this._filteredBy = [];
    }

    getAPI() {
        return API + "transactions";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = Number(value);
    }

    get date() {
        return this._date;
    }

    get dateFormattedFR() {
        return MyMoment.formatDateFR(this._date);
    }

    get dateFormattedEN() {
        return MyMoment.formatDateEN(this._date);
    }

    get dateLong() {
        return this._date.getTime();
    }

    set date(value) {
        this._date = new Date(value);
    }

    get destinationAccountId() {
        return Number(this._destinationAccountId) || null;
    }

    set destinationAccountId(value) {
        this._destinationAccountId = value;
    }

    get sourceAccountId() {
        return Number(this._sourceAccountId);
    }

    set sourceAccountId(value) {
        if (this._sourceAccountId && this.sourceAccountId !== Number(value)) {
            this.emit("model moved");
        }
        this._sourceAccountId = value;
    }

    get categoryId() {
        return Number(this._categoryId);
    }

    set categoryId(value) {
        this._categoryId = value;
    }

//TODO ref - maybe using browser database
    getCategory() {
        return new Promise(resolve => {
            const category = new Category();
            category.findAll().then(categories => {
                for (const category of categories) {
                    if (category.id === Number(this._categoryId))
                        resolve(category.name);
                }
            });
        });
    }

    get filteredBy() {
        return this._filteredBy;
    }

    set filteredBy(value) {
        this._filteredBy = value;
    }

    addFilter(filter) {
        if (!this._filteredBy.includes(filter))
            this._filteredBy.push(filter);
    }

    removeFilter(filter) {
        if (this._filteredBy.includes(filter)) {
            const index = this._filteredBy.indexOf(filter);
            this._filteredBy.splice(index, 1);
        }
    }
}