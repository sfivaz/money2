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
        DataSync.update(this.getAPI(), this)
            .then(() => this.emit("model edited"));
    }

    create() {
        return DataSync.insert(this.getAPI(), this);
    }

    delete() {
        DataSync.dellete(this.getAPI(), this.toString())
            .then(() => this.emit("remove model"));
    }

    findAll(whereClause = null) {
        return new Promise(resolve => {
            DataSync.select(this.getAPI(), JSON.stringify(whereClause))
                .then(objects => {
                    const models = objects.map(object =>
                        Object.assign(new this.constructor(), object));
                    resolve(models);
                });
        });
    }
}