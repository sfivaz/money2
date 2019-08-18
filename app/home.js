import {Home} from "./js/models/Home";
import {HomePageView} from "./js/templates/HomePageView";
import {Account} from "./js/models/Account";

new Account().findAll()
    .then(accounts => {
        const home = new Home(accounts);
        $(() => new HomePageView(home));
    });

