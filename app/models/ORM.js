import {API} from "../helpers/API";
import {HttpService} from "../services/HttpService";
import {TokenService} from "../services/TokenService";

export class ORM {

    getAPI() {
        return API;
    }

    find(id) {
        return HttpService.get(this.getAPI() + '/' + id, TokenService.getToken())
            .then(object =>
                Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    findAll(parentId = null) {
        const url = this.getAPI() + (parentId ? '/' + parentId : '');
        return HttpService.get(url, TokenService.getToken())
            .then(objects => objects.map(object =>
                Object.assign(new this.constructor(), object)))
            .catch(console.log);
    }

    save() {
        const url = this.getAPI() + '/' + this.id;
        return HttpService.put(url, this, TokenService.getToken())
            .then(object => Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    create() {
        return HttpService.post(this.getAPI(), this, TokenService.getToken())
            .then(object => Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    delete() {
        const url = this.getAPI() + '/' + this.id;
        return HttpService.delete(url, TokenService.getToken())
    }
}