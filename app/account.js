import {Account} from "./models/Account";
import {AccountPageView} from "./templates/Account/AccountPageView";
import {AuthHelper} from "./services/AuthHelper";

const accountId = $(".page").data('accountId');

AuthHelper.isAuth();

new Account().find(accountId)
    .then(account =>
        $(() => {
            new AccountPageView(account);

            $('#btn-logout').click(() => AuthHelper.logout());
        }));

