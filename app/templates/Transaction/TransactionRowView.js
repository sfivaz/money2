import {getCurrentAccount} from "../../helpers/accountHelper";

export class TransactionRowView {

    static template(transaction) {
        //TODO rename these classes
        return `
            <div class="template-row transaction-grid align-items-center ${TransactionRowView.getColor(transaction)}" 
                data-id="${transaction.id}">
                <span class="grid-date">${transaction.dateInFR}</span>
                <span class="grid-category">${transaction.category.name}</span>
                <span class="grid-description">${transaction.description}</span>
                <span class="grid-value">${transaction.value.toFixed(2)}</span>
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