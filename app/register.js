import {User} from "./models/User";

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
        .then(user => {
            // window.location.href = '/login'
        })
        .catch(() => $("#error-msg").removeClass("d-none"));
}