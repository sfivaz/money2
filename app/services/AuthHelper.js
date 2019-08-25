import {TokenService} from "./TokenService";

export class AuthHelper {

    static logout() {
        TokenService.removeToken();
        window.location.href = '/login';
    }
}