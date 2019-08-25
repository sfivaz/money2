import {Home} from "./models/Home";
import {HomePageView} from "./templates/HomePageView";
import {Account} from "./models/Account"

new Account().findAll()
    .then(accounts => {
        console.log(accounts);
        const home = new Home(accounts);
        $(() => new HomePageView(home));
    });

