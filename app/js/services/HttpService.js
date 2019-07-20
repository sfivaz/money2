export class HttpService {

    static _handleErrors(res) {
        if (res.ok) {
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }

    static get(url) {
        return fetch(url)
            .then(res => HttpService._handleErrors(res))
            .then(res => res.json());
    }

    static post(url, data) {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.json());
    }
}