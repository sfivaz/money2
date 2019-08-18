import {Account} from "../../models/Account";
import {ModelForm} from "../../../shared/ModelForm";

export class AccountForm extends ModelForm {

    template(account) {
        let action = 'Create';
        if (account.id)
            action = 'Edit';
        return `
            <div class="my-modal">
                <div class="d-flex align-items-center">
                    <h2 class="f-1">${action}</h2>
                    <button id="btn-close-modal" class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <input id="account-id" type="hidden" value="${account.id || ''}">
                    <input id="account-balance" type="hidden" value="${account.balance || 0}">
                    <div class="form-group">
                        <label>name</label>
                        <input id="account-name" class="form-control" placeholder="name" value="${account.name || ''}" 
                            required>
                    </div>
                    <div>
                        <button id="btn-submit" type="submit" class="btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;
    }

    buildModel() {
        const id = $("#account-id").val();
        const name = $("#account-name").val();
        const balance = $("#account-balance").val();
        return new Account(id, name, balance);
    }
}