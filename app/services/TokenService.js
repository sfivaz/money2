const KEY = 'token';

export class TokenService {

    static hasToken() {
        return !!this.getToken();
    }

    static getToken() {
        return window.localStorage.getItem(KEY);
    }

    static setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    static removeToken() {
        window.localStorage.removeItem(KEY);
    }
}