import {HttpService} from "../services/HttpService";

export class DataSync {

    static _convertModel(model, removeId = false) {
        let converted = {};
        let keys = Object.keys(model);
        keys.forEach(key => {
            if (key.charAt(0) === "_") {
                const newKey = key.slice(1);
                converted[newKey] = model[key];
            }
        });
        if (removeId)
            delete converted.id;
        return converted;
    }

    static select(api) {
        return HttpService.get(api);
    }

    static insert(api, data) {
        data = DataSync._convertModel(data);
        return HttpService.post(api, data);
    }

    static update(api, data) {
        data = DataSync._convertModel(data);
        return HttpService.put(api, data);
    }

    static delete(api) {
        return HttpService.delete(api);
    }
}