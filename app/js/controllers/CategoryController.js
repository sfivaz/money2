import {Controller} from "./Controller";

export class CategoryController extends Controller {

    edit(elements) {
        this.model.name = elements[0];
        this.model.budget = elements[1];
        this.model.save();
    }
}