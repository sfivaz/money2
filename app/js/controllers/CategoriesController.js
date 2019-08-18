import {Controller} from "./Controller";
import {Category} from "../models/Category";
import {CategoryController} from "../controllers/CategoryController";
import {CategoryRowView} from "../views/Category/CategoryRowView";

export class CategoriesController extends Controller {

    static get childClass() {
        return Category;
    }

    static get childControllerClass() {
        return CategoryController;
    }

    static get childViewClass() {
        return CategoryRowView;
    }
}