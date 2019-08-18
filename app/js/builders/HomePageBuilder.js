import {PageBuilder} from "./PageBuilder";
import {HomePageView} from "../templates/HomePageView";
import {HomeController} from "../controllers/HomeController";
import {Home} from "../models/Home";

export class HomePageBuilder extends PageBuilder {

    static build() {
        super.build(null, Home, HomePageView, HomeController);
    }
}