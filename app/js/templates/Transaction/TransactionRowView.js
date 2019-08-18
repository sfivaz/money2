import {getCurrentAccount} from "../../helpers/accountHelper";

export class TransactionRowView {

    static template(account) {
        //TODO rename these classes
        return `
            <div class="template-row align-items-center ${TransactionRowView.getColor(account)}" 
                data-id="${account.id}">
                <span class="row-date">${account.dateFormattedFR}</span>
                <span class="row-category">${account.category}</span>
                <span class="row-description">${account.description}</span>
                <span class="row-value">${account.value.toFixed(2)}</span>
                <button class="row-btn-edit btn-edit-row btn btn-primary mr-3"><i class="fa fa-pencil-square-o"></i></button>
                <button class="row-btn-del btn-delete-row btn btn-danger mr-3"><i class="fa fa-trash-o"></i></button>
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