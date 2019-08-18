import {PageBuilder} from "./PageBuilder";
import {Account} from "../models/Account";
import {AccountPageView} from "../templates/Account/AccountPageView";
import {AccountController} from "../controllers/AccountController";

export class AccountPageBuilder extends PageBuilder{

    static build(object) {
        super.build(object, Account, AccountPageView, AccountController);
    }
}