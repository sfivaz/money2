export class HttpService {

    static _handleErrors(res) {
        if (res.ok)
            return res;
        else
            throw new Error(res.statusText);
    }

    static get(url, token = '') {
        return fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json());
    }

    static post(url, data, token = '') {
        return fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.json());
    }

    static put(url, data, token = '') {
        return fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'put',
            body: JSON.stringify(data)
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.json());
    }

    static delete(url, token = '') {
        return fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'delete'
        })
            .then(res => HttpService._handleErrors(res))
            .then(res => res.status);
    }
}