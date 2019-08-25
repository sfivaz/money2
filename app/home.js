import {Home} from "./models/Home";
import {HomePageView} from "./templates/HomePageView";
import {Account} from "./models/Account"
import {AuthHelper} from "./services/AuthHelper";

AuthHelper.isAuth();

new Account().findAll()
    .then(accounts => {
        const home = new Home(accounts);
        $(() => {
            new HomePageView(home);

            $('#btn-logout').click(() => AuthHelper.logout());
        });
    });

