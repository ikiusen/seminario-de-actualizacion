import { FormCreateUserController } from '../controller/FormCreateUserController.js';
import { HTMLDataTable } from '/html-elements/create-user-form/components/data-table/controller/HTMLDataTable.js';
import { HTMLTextCell } from '/html-elements/create-user-form/components/data-table/view/HTMLTextCell.js';
import { HTMLCheckboxCell } from '/html-elements/create-user-form/components/data-table/view/HTMLCheckboxCell.js';

class FormCreateUserView extends HTMLElement {
    constructor(model) {
        super();
        this.model = model;
        this.controller = new FormCreateUserController(this, this.model);

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar');

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'Create User'

        this.usernameLabel = document.createElement('label');
        this.usernameLabel.classList.add('w3-label');
        this.usernameLabel.innerText = 'Username:';

        this.usernameInput = document.createElement('input');
        this.usernameInput.classList.add('w3-input', 'w3-border');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'Username';

        this.passwordLabel = document.createElement('label');
        this.passwordLabel.classList.add('w3-label');
        this.passwordLabel.innerText = 'Password:';

        this.passwordInput = document.createElement('input');
        this.passwordInput.classList.add('w3-input', 'w3-border');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';

        this.createButton = document.createElement('button');
        this.createButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.createButton.innerText = 'Create';
        this.createButton.addEventListener('click', () => this.controller.onCreateButtonClick());

        this.getUsersButton = document.createElement('button');
        this.getUsersButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.getUsersButton.innerText = 'Get Users';
        this.getUsersButton.addEventListener('click', () => this.dataTable.onfirstpagerequest());

        this.deleteButton = document.createElement('button');
        this.deleteButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.deleteButton.innerText = 'Delete';
        this.deleteButton.addEventListener('click', () => this.controller.onDeleteButtonClick());

        this.updateButton = document.createElement('button');
        this.updateButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.updateButton.innerText = 'Update';
        this.updateButton.addEventListener('click', () => this.controller.onUpdateButtonClick());

        this.dataTable = new HTMLDataTable();
        this.dataTable.appendColumn({ name: '*', sortable: false, type: HTMLCheckboxCell, title: "*", reader: x => false});
        this.dataTable.appendColumn({ name: 'id', sortable: true, type: HTMLTextCell, title: "ID", reader: x => x.id });
        this.dataTable.appendColumn({ name: 'name', sortable: true, type: HTMLTextCell, title: "Name", reader: x => x.name });
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.usernameLabel);
        this.form.appendChild(this.usernameInput);
        this.form.appendChild(this.passwordLabel);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.createButton);
        this.form.appendChild(this.getUsersButton);
        this.form.appendChild(this.deleteButton);
        this.form.appendChild(this.updateButton);
        this.form.appendChild(this.dataTable);

        this.appendChild(this.form);
    }

    getFormData() {
        let values = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }
        return values;
    }
    getUserToDelete() {
        let value = {
            id: prompt('User ID for deletion')
        }
        return value;
    }

    getUserToUpdate() {
        let values = {
            id: prompt('User ID to update'),
            username: prompt('New username'),
            password: prompt('New password')
        }
        return values;
    }
}

customElements.define('x-form-view', FormCreateUserView);

export { FormCreateUserView };
