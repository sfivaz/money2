import {HttpService} from "./services/HttpService";

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
    HttpService.post('/register', user)
        .then(response => {
            if (response.status === 200)
                window.location.href = '/';
            else
                $("#error-msg").removeClass("d-none");
        });
}