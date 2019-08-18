import {Category} from "../models/Category";

export const categoriesPromise = new Category().findAll();