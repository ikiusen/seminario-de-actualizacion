import { FormCreateUserController } from '../controller/FormCreateUserController.js';

class FormCreateUserView extends HTMLElement {
    constructor(model) {
        super();
        this.model = model;
        this.controller = new FormCreateUserController(this, this.model);

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar');
        this.form.style.maxWidth = '500px';

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'Create User'

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
        this.createButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-bottom');
        this.createButton.innerText = 'Create';
        this.createButton.addEventListener('click', () => this.controller.onCreateButtonClick());

        this.getUsersButton = document.createElement('button');
        this.getUsersButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-bottom', 'w3-margin-left');
        this.getUsersButton.innerText = 'Get Users';
        this.getUsersButton.addEventListener('click', () => this.controller.onGetUsersButtonClick());

        this.userList = document.createElement('table');
        this.userList.classList.add('w3-table-all', 'w3-hoverable', 'w3-section');
        this.userList.addEventListener('click', (e) => this.controller.onTableClick(e));
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.usernameLabel);
        this.form.appendChild(this.usernameInput);
        this.form.appendChild(this.passwordLabel);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.createButton);
        this.form.appendChild(this.getUsersButton);
        this.form.appendChild(this.userList);

        this.appendChild(this.form);
    }

    getFormData() {
        let values = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }
        return values;
    }

    initializeTable() {
        let firstRow = document.createElement('tr');
        let idHeader = document.createElement('th');
        idHeader.innerText = "Id";
        let userHeader = document.createElement('th');
        userHeader.innerText = "User";
        let deleteHeader = document.createElement('th');
        deleteHeader.innerText = "";
        let updateHeader = document.createElement('th');
        updateHeader.innerText = "";

        firstRow.appendChild(idHeader);
        firstRow.appendChild(userHeader);
        firstRow.appendChild(deleteHeader);
        firstRow.appendChild(updateHeader);

        this.userList.appendChild(firstRow);
    }

    clearTable() {
        while (this.userList.firstChild) {
            this.userList.removeChild(this.userList.firstChild);
        }
    }

    addUserToTable(id, user) {
        let row = document.createElement('tr');
        let idItem = document.createElement('td');
        idItem.innerText = id;
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
        this.userList.appendChild(row);
    }
}

customElements.define('x-form-view', FormCreateUserView);

export { FormCreateUserView };
