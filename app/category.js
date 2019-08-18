import {Categories} from "./models/Categories";
import {CategoriesPageView} from "./templates/CategoriesPageView";
import {Category} from "./models/Category";

new Category().findAll()
    .then(categories => {
        const categoriesInstance = new Categories(categories);
        $(() => new CategoriesPageView(categoriesInstance));
    });