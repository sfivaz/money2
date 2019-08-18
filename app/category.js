import {Categories} from "./js/models/Categories";
import {CategoriesPageView} from "./js/templates/CategoriesPageView";
import {Category} from "./js/models/Category";

new Category().findAll()
    .then(categories => {
        const categoriesInstance = new Categories(categories);
        $(() => new CategoriesPageView(categoriesInstance));
    });