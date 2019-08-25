import {ORM} from "./ORM";
import {HttpService} from "../services/HttpService";
import {TokenService} from "../services/TokenService";

export class User extends ORM {

    constructor(id, firstName, lastName, email, password) {
        super();
        this._id = Number(id);
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
    }

    get id() {
        if (this._id)
            return this._id;
    }

    set id(value) {
        this._id = Number(value);
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

    register() {
        return new Promise((resolve, reject) => {
            HttpService.post(this.getAPI() + 'register', this, TokenService.getToken())
                .then(response => {
                    if (response.status && response.status === 409)
                        reject(response);
                    else {
                        const user = Object.assign(new this.constructor(), response);
                        resolve(user);
                    }
                });
        });
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        };
    }
}