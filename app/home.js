import {Home} from "./js/models/Home";
import {HomePageView} from "./js/templates/HomePageView";
import {Account} from "./js/models/Account";
import {CategoriesPageView} from "./js/templates/CategoriesPageView";

new Account().findAll()
    .then(accounts => {
        $(() => new CategoriesPageView(home));
    });

