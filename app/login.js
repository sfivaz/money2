import {HttpService} from "./services/HttpService";

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
            if (response.status === 200)
                window.location.href = '/';
            else
                $("#error-msg").removeClass("d-none");
        });
}