import {AccountPageBuilder} from "./js/builders/AccountPageBuilder";
import {Account} from "./js/models/Account";

const accountId = $("main").data('accountId');

new Account()
    .find(accountId)
    .then(account =>
        AccountPageBuilder.build(account));

