export class AccountRowView {

    static template(account) {
        return `
            <div class="row align-items-center clr-account" data-id="${account.id}">
                <div onclick="window.location.href='/account/${account.id}'" class="row-main">
                    <span class="name f-9">${account.name}</span>
                    <span class="balance f-1">${account.balance.toFixed(2)}</span>
                </div>
                <aside class="row-aside">
                    <button class="btn-edit-row btn btn-primary mr-3"><i class="fa fa-pencil-square-o"></i></button>
                    <button class="btn-delete-row btn btn-danger mr-3"><i class="fa fa-trash-o"></i></button>
                </aside>
            </div>
        `;
    }
}