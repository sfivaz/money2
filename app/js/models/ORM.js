import {EventEmitter} from "../services/EventEmitter";
import {DataSync} from "../services/DataSync";

export class ORM extends EventEmitter {

    getAPI() {
        return "";
    }

    toString() {
        return JSON.stringify(this);
    }

    save() {
        return DataSync.update(this.getAPI() + '/' + this._id, this)
            .then(object => Object.assign(new this.constructor(), object));
    }

    create() {
        return DataSync.insert(this.getAPI(), this)
            .then(object => Object.assign(new this.constructor(), object));
    }

    delete() {
        return DataSync.delete(this.getAPI() + '/' + this._id);
    }

    find(id) {
        return new Promise(resolve => {
            DataSync.select(this.getAPI() + '/' + id)
                .then(object => {
                    //TODO put Object.assign as one of the constructors of a object
                    object = Object.assign(new this.constructor(), object);
                    resolve(object);
                })
                .catch(console.log);
        });
    }

    findAll(parentId = null) {
        return new Promise(resolve => {
            const url = this.getAPI() + (parentId ? '/' + parentId : '');
            DataSync.select(url)
                .then(objects => {
                    const models = objects.map(object =>
                        Object.assign(new this.constructor(), object));
                    resolve(models);
                });
        });
    }
}