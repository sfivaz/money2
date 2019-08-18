import {Home} from "./js/models/Home";
import {HomePageView} from "./js/views/HomePageView";
import {Account} from "./js/models/Account";

const account = new Account();
account.findAll().then(accounts => {

    const home = new Home(accounts);
    $(() => new HomePageView(home));
});

