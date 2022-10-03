import { UserManagementFormController } from '../controller/UserManagementFormController.js';

class UserManagementFormView extends HTMLElement {
    constructor(model) {
        super();

        this.__selectedRowId = null;

        this.model = model;
        this.controller = new UserManagementFormController(this, this.model);

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar', 'w3-margin');
        this.form.style.maxWidth = '500px';

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'User Management'

        this.usernameLabel = document.createElement('label');
        this.usernameLabel.classList.add('w3-label');
        this.usernameLabel.innerText = 'Username:';

        this.usernameInput = document.createElement('input');
        this.usernameInput.classList.add('w3-input', 'w3-border', 'w3-section');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'Username';

        this.passwordLabel = document.createElement('label');
        this.passwordLabel.classList.add('w3-label');
        this.passwordLabel.innerText = 'Password:';

        this.passwordInput = document.createElement('input');
        this.passwordInput.classList.add('w3-input', 'w3-border', 'w3-section');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';
        
        this.createButton = document.createElement('button');
        this.createButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.createButton.innerText = 'Create';
        this.createButton.addEventListener('click', () => this.controller.onCreateButtonClick());

        this.getUsersButton = document.createElement('button');
        this.getUsersButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-left');
        this.getUsersButton.innerText = 'Get Users';
        this.getUsersButton.addEventListener('click', () => this.controller.onGetUsersButtonClick());

        this.confirmButton = document.createElement('button');
        this.confirmButton.classList.add('w3-button', 'w3-round', 'w3-green', 'w3-hover-dark-grey', 'w3-margin-left');
        this.confirmButton.innerText = 'Confirm';
        this.confirmButton.style.visibility = 'hidden';
        this.confirmButton.addEventListener('click', () => this.controller.onConfirmButtonClick());

        this.cancelButton = document.createElement('button');
        this.cancelButton.classList.add('w3-button', 'w3-round', 'w3-red', 'w3-hover-dark-grey', 'w3-margin-left');
        this.cancelButton.innerText = 'Cancel';
        this.cancelButton.style.visibility = 'hidden';
        this.cancelButton.addEventListener('click', () => this.controller.onCancelButtonClick());

        this.userTable = document.createElement('table');
        this.userTable.classList.add('w3-table-all', 'w3-hoverable', 'w3-section');
        this.userTable.addEventListener('click', (e) => this.controller.onTableClick(e));
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.usernameLabel);
        this.form.appendChild(this.usernameInput);
        this.form.appendChild(this.passwordLabel);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.createButton);
        this.form.appendChild(this.getUsersButton);
        this.form.appendChild(this.confirmButton);
        this.form.appendChild(this.cancelButton);
        this.form.appendChild(this.userTable);

        this.appendChild(this.form);
    }

    setSelectedRowId(value) {
        this.__selectedRowId = value;
    }

    getSelectedRowId() {
        return this.__selectedRowId;
    }

    getFormData() {
        let values = {
            id: this.getSelectedRowId(),
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }
        return values;
    }

    initializeTable() {
        let firstRow = document.createElement('tr');

        let idHeader = document.createElement('th');
        idHeader.innerText = 'Id';
        idHeader.style.display = 'none';

        let userHeader = document.createElement('th');
        userHeader.innerText = 'User';

        let deleteHeader = document.createElement('th');
        deleteHeader.innerText = '';

        let updateHeader = document.createElement('th');
        updateHeader.innerText = '';

        firstRow.appendChild(idHeader);
        firstRow.appendChild(userHeader);
        firstRow.appendChild(deleteHeader);
        firstRow.appendChild(updateHeader);

        this.userTable.appendChild(firstRow);
    }

    addUserToTable(id, user) {
        let row = document.createElement('tr');
        row.setAttribute('pkey', id);

        let idItem = document.createElement('td');
        idItem.innerText = id;
        idItem.style.display = 'none';

        let userItem = document.createElement('td');
        userItem.innerText = user;

        let deleteContainer = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-padding-small');
        deleteContainer.appendChild(deleteButton);

        let updateContainer = document.createElement('td');
        let updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-padding-small');
        updateContainer.appendChild(updateButton);

        row.appendChild(idItem);
        row.appendChild(userItem);
        row.appendChild(deleteContainer);
        row.appendChild(updateContainer);
        this.userTable.appendChild(row);
    }

    clearTable() {
        while (this.userTable.firstChild) {
            this.userTable.removeChild(this.userTable.firstChild);
        }
    }

    setUserForUpdate(user) {
        this.usernameInput.value = user;
        this.usernameInput.disabled = true;

        this.cancelButton.style.visibility = 'visible';
        this.confirmButton.style.visibility = 'visible';
        this.createButton.disabled = true;
    }

    clearInputs() {
        this.usernameInput.value = '';
        this.passwordInput.value = '';
    }

    clearUpdate() {
        this.clearInputs();
        this.cancelButton.style.visibility = 'hidden';
        this.confirmButton.style.visibility = 'hidden';
        this.createButton.disabled = false;
        this.usernameInput.disabled = false;
        this.setSelectedRowId(null);
    }
}

customElements.define('x-user-management-form-view', UserManagementFormView);

export { UserManagementFormView };
