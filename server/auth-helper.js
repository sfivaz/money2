const axios = require('axios');

class AuthHelper {

    static login(email, password) {
        return axios
            .post('http://localhost:3000/login', {
                email, password
            })
            .then(response => response.data);
    }
}

module.exports = AuthHelper;