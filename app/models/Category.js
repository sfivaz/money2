import {ORM} from "./ORM";

export class Category extends ORM {
    constructor(id, name, budget, userId) {
        super();
        this.id = id;
        this.name = name;
        this.budget = budget;
        this.userId = userId;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = Number(value);
    }

    get userId() {
        return this._user_id;
    }

    set userId(value) {
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

    getAPI() {
        return super.getAPI() + "categories";
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            budget: this.budget,
            userId: this.userId
        }
    }
}