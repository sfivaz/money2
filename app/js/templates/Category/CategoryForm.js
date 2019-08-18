import {ModelForm} from "../../helpers/ModelForm";
import {Category} from "../../models/Category";

export class CategoryForm extends ModelForm {

    template(category) {
        let action = 'Create';
        if (category.id)
            action = 'Edit';
        return `
            <div class="my-modal">
                <div class="d-flex align-items-center">
                    <h2 class="f-1">${action}</h2>
                    <button id="btn-close-modal" class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <input id="category-id" type="hidden" value="${category.id || ''}">
                    <div class="form-group">
                        <label>name</label>
                        <input id="category-name" class="form-control" placeholder="name" value="${category.name || ''}" 
                            required>
                    </div>
                    <div class="form-group">
                        <label>budget</label>
                        <input id="category-budget" class="form-control" placeholder="budget" value="${category.budget || ''}" 
                            required>
                    </div>
                    <div>
                        <button id="btn-submit" type="submit" class="btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;
    }

    buildModel() {
        const id = $("#category-id").val();
        const name = $("#category-name").val();
        const budget = $("#category-budget").val();
        return new Category(id, name, budget);
    }
}