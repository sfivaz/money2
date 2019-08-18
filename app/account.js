import {Account} from "./models/Account";
import {AccountPageView} from "./templates/Account/AccountPageView";

const accountId = $(".page").data('accountId');

new Account().find(accountId)
    .then(account => {
        $(() => new AccountPageView(account));
    });
