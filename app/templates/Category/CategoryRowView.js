export class CategoryRowView {

    static template(category) {
        return `
            <div class="template-row align-items-center clr-account" data-id="${category.id}">
                <div class="row-main">
                    <span class="name f-9">${category.name}</span>
                    <span class="balance f-1">${category.budget}</span>
                </div>
                <aside class="row-aside">
                    <button class="btn-edit-row btn btn-primary mr-3"><i class="fa fa-pencil-square-o"></i></button>
                    <button class="btn-delete-row btn btn-danger mr-3"><i class="fa fa-trash-o"></i></button>
                </aside>
            </div>
        `;
    }
}