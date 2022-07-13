import { FormController } from '../controller/FormController.js';

class FormView extends HTMLElement {
    constructor(model) {
        super();
        this.model = model;
        this.controller = new FormController(this, this.model);

        this.form = document.createElement('form');
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
        this.passwordLabel.innerText = 'Password';

        this.passwordInput = document.createElement('input');
        this.passwordInput.classList.add('w3-input', 'w3-border');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';

        this.confirmButton = document.createElement('button');
        this.confirmButton.classList.add('w3-button', 'w3-round', 'w3-green', 'w3-hover-dark-grey');
        this.confirmButton.innerText = 'Create';

        this.cancelButton = document.createElement('button');
        this.cancelButton.classList.add('w3-button', 'w3-round', 'w3-red', 'w3-hover-dark-grey');
        this.cancelButton.innerText = 'Cancel';
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.usernameLabel);
        this.form.appendChild(this.usernameInput);
        this.form.appendChild(this.passwordLabel);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.cancelButton);
        this.form.appendChild(this.confirmButton);

        this.appendChild(this.form);
    }

    getFormData() {
        let values = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        return values;
    }
}

customElements.define('x-form-view', FormView);

export { FormView };
