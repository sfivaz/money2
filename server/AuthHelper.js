const axios = require('axios');

class AuthHelper {

    static processLogin(email, password) {

        axios.post('http://localhost:3000/login', {
            email, password
        })
            .then(response => console.log(response.data))
            .catch(error => console.log(error.response.status));
    }
}

module.exports = AuthHelper;