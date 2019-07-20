import {PageBuilder} from "./PageBuilder";
import {Account} from "../models/Account";
import {AccountPageView} from "../views/Account/AccountPageView";

export class AccountPageBuilder extends PageBuilder{

    static build(object) {
        super.build(object, Account, AccountPageView, AccountController);
    }
}