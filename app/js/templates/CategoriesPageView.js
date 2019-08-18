import {PageView} from "./PageView";
import {CategoryForm} from "./Category/CategoryForm";
import {$$} from "../helpers/myJQuery";

export class CategoriesPageView extends PageView {

    template() {

        this.elements = PageView.pageTemplate("New Category");

        this.elements.title = $$("<h2>");
        this.elements.title.textContent = "Categories";

        this.elements.header.append(this.elements.title);

        return this.elements.template;
    }

    createChildTemplate() {

        const template = CategoryForm.template();

        template.title.textContent = "create category";
        template.btnSubmit.textContent = "create";

        template.btnSubmit.addEventListener("click", () => {
            this.emit("create child", template.iptName.value, template.iptBudget.value);
            template.form.parentElement.removeChild(template.form);
        });
    }
}