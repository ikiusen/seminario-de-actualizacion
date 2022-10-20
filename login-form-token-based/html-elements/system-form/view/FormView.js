import { FormController } from '../controller/FormController.js';

class FormView extends HTMLElement {
    constructor(model) {
        super();
        this.model = model;
        this.controller = new FormController(this, this.model);

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar', 'w3-margin-top');
        this.form.style.maxWidth = '500px';
        this.form.style.margin = 'auto';

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'Welcome!'

        this.getUsersButton = document.createElement('button');
        this.getUsersButton.classList.add('w3-button', 'w3-green', 'w3-section', 'w3-round');
        this.getUsersButton.innerText = 'Get Users';

        this.logOutButton = document.createElement('button');
        this.logOutButton.classList.add('w3-button', 'w3-red', 'w3-section', 'w3-round', 'w3-margin-left');
        this.logOutButton.innerText = 'Log Out';
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.getUsersButton);
        this.form.appendChild(this.logOutButton);

        this.getUsersButton.addEventListener('click', () => this.controller.onGetUsersButtonClick());
        this.logOutButton.addEventListener('click', () => this.controller.onLogOutButtonClick());

        this.appendChild(this.form);
    }
}

customElements.define('x-form-view', FormView);

export { FormView };
