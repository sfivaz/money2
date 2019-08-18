import {Account} from "./js/models/Account";
import {AccountPageView} from "./js/templates/Account/AccountPageView";

const accountId = $(".page").data('accountId');

new Account().find(accountId)
    .then(account => {
        $(() => new AccountPageView(account));
    });
