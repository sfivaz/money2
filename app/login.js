import {User} from "./models/User";
import {HttpService} from "./services/HttpService";

$(() => {
    $("#error-msg").hide();

    $("form").submit(event => {
            event.preventDefault();
            const email = $("#email").val();
            const password = $("#password").val();
            login(email, password);
        }
    );
});

function login(email, password) {
    HttpService.post('http://localhost:8080/login', {email, password})
        .then((result) => {
            console.log(result);
            // $("#error-msg").show();
        });
}