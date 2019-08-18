import {Controller} from "./Controller";
import {Account} from "../models/Account";
import {AccountController} from "./AccountController";
import {AccountRowView} from "../templates/Account/AccountRowView";

export class HomeController extends Controller {

    static get childClass() {
        return Account;
    }

    static get childControllerClass() {
        return AccountController;
    }

    static get childViewClass() {
        return AccountRowView;
    }
}