import {User} from "./models/User";

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
    User.login(email, password)
        .then((user) => {
            console.log(user);
            if (user)
                createSession(user);
            else
                $("#error-msg").show();
        });
}