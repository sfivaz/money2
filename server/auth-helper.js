const axios = require('axios');

const API = 'http://localhost:3000';

class AuthHelper {

    static login(email, password) {
        return axios
            .post(API + '/login', {email, password})
            .then(response => response.data);
    }

    static register(user) {
        return axios
            .post(API + '/users', user)
            .then(response => response.data);
    }
}

module.exports = AuthHelper;