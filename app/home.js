// import {HomePageBuilder} from "./js/builders/HomePageBuilder";
import {Home} from "./js/models/Home";
import {HomePageView} from "./js/views/HomePageView";
// import {HomeController} from "./js/controllers/HomeController";
import {Account} from "./js/models/Account";

// HomePageBuilder.build();

const account = new Account();
account.findAll().then(accounts => {

    const home = new Home(accounts);
    const view = new HomePageView(home);
// const constructor = new HomeController();
});

