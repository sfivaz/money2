import {User} from "./models/User";
import {AuthHelper} from "./services/AuthHelper";

$(() => {
    $("form").submit(event => {
            event.preventDefault();
            const email = $("#email").val();
            const password = $("#password").val();
            login(email, password);
        }
    );
});

function login(email, password) {
    User.login(email, password)
        .then(response => AuthHelper.login(response.token))
        .catch(() => $("#error-msg").removeClass("d-none"));
}

