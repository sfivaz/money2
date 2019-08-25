import {TokenService} from "./TokenService";

export class AuthHelper {

    static isAuth() {
        if (!TokenService.hasToken())
            window.location.href = '/login';
    }

    static logout() {
        TokenService.removeToken();
        window.location.href = '/login';
    }
}