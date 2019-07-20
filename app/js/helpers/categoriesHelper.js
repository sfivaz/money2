function getCategory(category_id) {
    for (let i = 0; i < categories.length; i++)
        if (categories[i].id == category_id)
            return categories[i];
}