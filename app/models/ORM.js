import {API} from "../helpers/API";
import {HttpService} from "../services/HttpService";

export class ORM {

    getAPI() {
        return API;
    }

    find(id) {
        return HttpService.get(this.getAPI() + '/' + id)
            .then(object => Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    findAll(parentId = null) {
        const url = this.getAPI() + (parentId ? '/' + parentId : '');
        return HttpService.get(url)
            .then(objects => objects.map(object =>
                Object.assign(new this.constructor(), object)))
            .catch(console.log);
    }

    save() {
        return HttpService.put(this.getAPI() + '/' + this.id, this)
            .then(object => Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    create() {
        return HttpService.post(this.getAPI(), this)
            .then(object => Object.assign(new this.constructor(), object))
            .catch(console.log);
    }

    delete() {
        return HttpService.delete(this.getAPI() + '/' + this.id)
    }
}