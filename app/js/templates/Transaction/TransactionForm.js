import {accountsPromise} from "../../helpers/globalAccounts";
import {categoriesPromise} from "../../helpers/globalCategories";
import {MyMoment} from "../../helpers/myMoment";
import {Transaction} from "../../models/Transaction";
import {getCurrentAccount} from "../../helpers/accountHelper";
import {ModelForm} from "../../helpers/ModelForm";

export class TransactionForm extends ModelForm {

    constructor(cb) {
        super(cb);
        accountsPromise.then(accounts => this.accounts = accounts);
        categoriesPromise.then(categories => this.categories = categories);
    }

    eventHandlers() {
        this._container.click(event => {
            if (event.target.id === "btn-close-modal")
                this._close();
        });

        this._container.change(event => {
            if (event.target.id === 'transaction-type')
                TransactionForm.triggerDestinationAccount(event);
            else if (event.target.id === 'transaction-source-id' || event.target.id === 'transaction-destination-id')
                TransactionForm.checkAccounts(event);
        });

        this._container.submit(event => {
            this._submitForm(event);
        });
    }

    static triggerDestinationAccount(event) {
        const isTransfer = event.target.value === 'transfer';
        const slcDestination = $("#transaction-destination-id");
        slcDestination.attr('disabled', !isTransfer);
        slcDestination.attr('required', isTransfer);
    }

    static checkAccounts(event) {
        this.checkAccountsAreEqual(event);
    }

    static checkAccountsAreEqual(event) {
        if ($('#transaction-source-id').val() === $('#transaction-destination-id').val()) {
            event.target.setCustomValidity("source and destination account can't be the same");
            $('#btn-submit').trigger('click');
        } else
            event.target.setCustomValidity('');
    }

    template(transaction) {
        let action = 'Create';
        if (transaction.id)
            action = 'Edit';
        const types = ["spending", "income", "transfer"];
        //@formatter:off
        return `
            <div class="my-modal">
                <div class="d-flex align-items-start">
                    <h2 class="f-1">${action} transaction</h2>
                    <button id="btn-close-modal" class="btn btn-outline-dark">X</button>
                </div>
                <form>
                    <input id="transaction-id" type="hidden" value="${transaction.id || ''}">
                    <div class="form-group">
                        <div>
                            <label>description</label>
                            <input id="transaction-description" class="form-control" placeholder="description" 
                                value="${transaction.description || ''}">
                        </div>
                    </div>
                    <div class="form-row ">
                        <div class="col">
                            <label>type</label>
                            <select id="transaction-type" class="form-control">
                                ${types.map(type => 
                                    `<option ${transaction.type === type ? 'selected' : ''} 
                                        value="${type}">${type}</option>`).join('')}
                            </select>
                        </div>
                        <div class="col">
                            <label>value</label>
                            <input id="transaction-value" class="form-control" value="${transaction.value || '222'}" required>
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <div class="col">
                            <label>category</label>
                            <select id="transaction-category-id" class="form-control">
                                ${this.categories.map(category => 
                                    `<option ${transaction.categoryId == category.id ? 'selected' : ''} 
                                        value="${category.id}">${category.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="col">
                            <label>date</label>
                            <input id="transaction-date" class="form-control" type="date" value="${MyMoment.now()}">
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <div class="col">
                            <label>source account</label>
                            <select id="transaction-source-id" class="form-control">
                                ${this.buildSources(transaction)}
                            </select>
                        </div>
                        <div class="col">
                            <label>destination account</label>
                            <select id="transaction-destination-id" name="destination" class="form-control"
                                ${transaction.type && transaction.type === 'transfer' ? 'required' : 'disabled'} >
                                ${this.buildDestinations(transaction)}
                            </select>
                        </div>
                    </div>
                    <div class="form-row form-group">
                        <button id="btn-submit" type="submit" class="btn-lg btn-block btn-success d-block m-auto">${action}</button>
                    </div>
                </form>
            </div>
        `;
        //@formatter:on
    }

    buildSources(transaction) {
        let accountId = getCurrentAccount();

        if (transaction.id)
            accountId = transaction.sourceAccountId;

        return this.accounts.map(account =>
            `<option ${account.id == accountId ? 'selected' : ''} 
                value="${account.id}">${account.name}</option>`)
            .join('');
    }


    buildDestinations(transaction) {
        return [{id: '', name: 'select an option'}].concat(this.accounts).map(account =>
            `<option ${transaction.destinationAccountId == account.id ? 'selected' : ''} 
                value="${account.id}">${account.name}</option>`)
            .join('');
    }

    _submitForm(event) {
        event.preventDefault();
        if ($(event.target).closest('form')[0].checkValidity()) {
            this.dataProcess();
            this.submit();
        }
    }

    dataProcess() {
        const iptDescription = $("#transaction-description");
        if (!iptDescription.val()) {
            const categoryName = $("#transaction-category-id option:selected").text();
            iptDescription.val(categoryName);
        }
    }

    buildModel() {
        const id = $("#transaction-id").val();
        const description = $("#transaction-description").val();
        const type = $("#transaction-type").val();
        const value = $("#transaction-value").val();
        const categoryId = $("#transaction-category-id").val();
        const date = $("#transaction-date").val();
        const sourceAccountId = $("#transaction-source-id").val();
        let destinationAccountId = null;
        if (type === 'transfer')
            destinationAccountId = $("#transaction-destination-id").val();

        return new Transaction(id, description, type, value, categoryId, date, sourceAccountId, destinationAccountId);
    }
}