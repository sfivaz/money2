import {ORM} from "./ORM";
import {API} from "../helpers/API";
import {dateFormatEN, dateFormatFR} from "../helpers/dateGlobal";

export class Transaction extends ORM {

    constructor(id, description, type, value, categoryId, date, sourceAccountId, destinationAccountId) {
        super();
        this.id = id;
        this.description = description;
        this.type = type;
        this.value = value;
        this.categoryId = categoryId;
        this.date = date;
        this.sourceAccountId = sourceAccountId;
        this.destinationAccountId = destinationAccountId;
        this.filteredBy = [];
    }

    getAPI() {
        return API + "transactions";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = Number(value);
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

    get dateInFR() {
        return this._date.format(dateFormatFR);
    }

    get dateInEN() {
        return this._date.format(dateFormatEN);
    }

    get dateLong() {
        return this._date.getTime();
    }

    set date(value) {
        this._date = moment(value, dateFormatEN);
    }

    get destinationAccountId() {
        return this._destinationAccountId !== 0 ? this._destinationAccountId : null;
    }

    set destinationAccountId(value) {
        this._destinationAccountId = Number(value);
    }

    get sourceAccountId() {
        return this._sourceAccountId;
    }

    set sourceAccountId(value) {
        this._sourceAccountId = Number(value);
    }

    get categoryId() {
        return this._categoryId;
    }

    set categoryId(value) {
        this._categoryId = Number(value);
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