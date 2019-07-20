import {HttpService} from "../services/HttpService";

export class DataSync {

    static select(api) {
        return HttpService.get(api);
    }

    static insert(api, data) {
        return HttpService.post(api, data);
    }

    static update(model, json) {
        return HttpService.post("server/" + model + "/update", json);
    }

    static dellete(model, json) {
        return HttpService.post("server/" + model + "/delete", json);
    }
}