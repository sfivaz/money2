import {AccountPageBuilder} from "./js/builders/AccountPageBuilder";
import {Account} from "./js/models/Account";

new Account()
    .find(2)
    .then(account =>
        AccountPageBuilder.build(account));

