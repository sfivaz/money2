import {HttpService} from "./services/HttpService";
import {TokenService} from "./services/TokenService";

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
    HttpService.post('/login', {email, password})
        .then(response => {
            console.log(response);
            if (response.status)
                $("#error-msg").removeClass("d-none");
            else {
                TokenService.setToken(response.token);
                window.location.href = '/';
            }
        });
}

