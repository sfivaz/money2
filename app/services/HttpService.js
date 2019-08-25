export class HttpService {

    static _handleErrors(res) {
        if (res.ok)
            return res;
        else
            throw new Error(res.statusText);
    }

    static get(url, token = null) {
        const options = {};
        if (token) {
            options.headers = {
                'Authorization': 'Bearer ' + token
            };
        }
        return fetch(url, options)
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

    static put(url, data) {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'put',
            body: JSON.stringify(data)
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.json());
    }

    static delete(url) {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'delete'
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.status);
    }
}