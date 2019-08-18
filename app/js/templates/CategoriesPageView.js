import {CategoryForm} from "./Category/CategoryForm";
import {ModelPageView} from "../../shared/ModelPageView";
import {CategoryRowView} from "./Category/CategoryRowView";

export class CategoriesPageView extends ModelPageView {

    constructor(categories) {
        super(categories);
        this.childForm = new CategoryForm(account => this.updateChildren(account));
        this.childName = 'category';
    }

    template(categories) {
        return this.listTemplate(categories.children);
    }

    listTemplate(categories) {
        return categories.map(category =>
            CategoryRowView.template(category))
            .join('');
    }

    updateTemplate(categories) {
        this._list.html(this.template(categories));
    }
}