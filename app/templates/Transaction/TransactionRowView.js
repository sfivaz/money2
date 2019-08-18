import {getCurrentAccount} from "../../helpers/accountHelper";

export class TransactionRowView {

    static template(account) {
        //TODO rename these classes
        return `
            <div class="template-row transaction-grid align-items-center ${TransactionRowView.getColor(account)}" 
                data-id="${account.id}">
                <span class="grid-date">${account.dateFormattedFR}</span>
                <span class="grid-category">${account.category.name}</span>
                <span class="grid-description">${account.description}</span>
                <span class="grid-value">${account.value.toFixed(2)}</span>
                <button class="btn-edit-row grid-btn-edit btn btn-primary mr-3"><i class="fa fa-pencil-square-o"></i></button>
                <button class="btn-delete-row grid-btn-delete btn btn-danger mr-3"><i class="fa fa-trash-o"></i></button>
            </div>
        `;
    }

    static getColor(transaction) {
        if (transaction.type === "transfer") {
            if (transaction.sourceAccountId === getCurrentAccount())
                return "clr-transfer-source";
            else
                return "clr-transfer-destiny";
        } else
            return " clr-" + transaction.type.toLowerCase();
    }
}