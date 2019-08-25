import {Categories} from "./models/Categories";
import {CategoriesPageView} from "./templates/CategoriesPageView";
import {Category} from "./models/Category";
import {AuthHelper} from "./services/AuthHelper";

AuthHelper.isAuth();

new Category().findAll()
    .then(categories => {
        const categoriesInstance = new Categories(categories);
        $(() => new CategoriesPageView(categoriesInstance));

        $('#btn-logout').click(() => AuthHelper.logout());
    });