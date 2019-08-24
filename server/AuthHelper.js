const request = require('request');

class AuthHelper {

    static processLogin(email, password) {
        const url = 'http://localhost:3000/login';

        request.post(url, {
            json: {email, password}
        }, (err, res, body) => {
            if (err)
                console.log(err);
            console.log(body);
            if (res.statusCode != 401) {
                console.log("login successful");
            } else {
                console.log("login failed");
            }
        });
    }


}

module.exports = AuthHelper;