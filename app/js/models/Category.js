import {ORM} from "./ORM";
import {API} from "../helpers/API";

export class Category extends ORM {

    constructor(id, name, budget) {
        super();
        this._id = Number(id);
        this._name = name;
        this._budget = Number(budget);
        this._user_id = null;
    }

    getAPI() {
        return API + "categories";
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = Number(value);
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = Number(value);
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        this._budget = Number(value);
    }
}