import {User} from "./models/User";
import {AuthHelper} from "./services/AuthHelper";

$(() => {
    $("form").submit(event => {
            event.preventDefault();
            const user = {
                firstName: $("#first-name").val(),
                lastName: $("#last-name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            };
            register(user);
        }
    );
});

function register(user) {
    user = Object.assign(new User(), user);
    user.register()
        .then(response => AuthHelper.login(response.token))
        .catch(() => $("#error-msg").removeClass("d-none"));
}