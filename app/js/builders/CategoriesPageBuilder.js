import {PageBuilder} from "./PageBuilder";
import {Categories} from "../models/Categories";
import {CategoriesPageView} from "../templates/CategoriesPageView";
import {CategoriesController} from "../controllers/CategoriesController";

export class CategoriesPageBuilder extends PageBuilder{

    static build() {
        super.build(null, Categories, CategoriesPageView, CategoriesController);
    }
}