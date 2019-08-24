class AuthHelper {

    static processLogin(email, password, res) {
        // fetch('http://localhost:3000/login', {
        //     headers: {'Content-type': 'application/json'},
        //     method: 'post',
        //     body: JSON.stringify({email, password})
        // })
            .then(res => res.text())
            .then(result => {
                if (result != 401) {
                    console.log("login failed");
                    res.text("login failed");
                } else {
                    console.log("login successful");
                    res.text("login successful");
                }
            });
    }
}

module.exports = AuthHelper;