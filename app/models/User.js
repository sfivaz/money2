import {ORM} from "./ORM";
import {HttpService} from "../services/HttpService";

export class User extends ORM {

    constructor(id, firstName, lastName, email, password) {
        super();
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    static login(email, password) {
        return HttpService.post(new ORM().getAPI() + 'login', {email, password});
    }
}