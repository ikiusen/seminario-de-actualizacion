import { GroupManagementFormController } from '../controller/GroupManagementFormController.js';

class GroupManagementFormView extends HTMLElement {
    constructor(model) {
        super();

        this.__selectedRowId = null;

        this.model = model;
        this.controller = new GroupManagementFormController(this, this.model);

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar');
        this.form.style.maxWidth = '500px';

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'Group Management'

        this.groupLabel = document.createElement('label');
        this.groupLabel.classList.add('w3-label');
        this.groupLabel.innerText = 'Group:';

        this.groupInput = document.createElement('input');
        this.groupInput.classList.add('w3-input', 'w3-border', 'w3-section');
        this.groupInput.type = 'text';
        this.groupInput.placeholder = 'Group name';

        this.descriptionLabel = document.createElement('label');
        this.descriptionLabel.classList.add('w3-label');
        this.descriptionLabel.innerText = 'Description:';

        this.descriptionInput = document.createElement('input');
        this.descriptionInput.classList.add('w3-input', 'w3-border', 'w3-section');
        this.descriptionInput.type = 'text';
        this.descriptionInput.placeholder = 'Group description';
        
        this.createButton = document.createElement('button');
        this.createButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey');
        this.createButton.innerText = 'Create';
        this.createButton.addEventListener('click', () => this.controller.onCreateButtonClick());

        this.getGroupsButton = document.createElement('button');
        this.getGroupsButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-left');
        this.getGroupsButton.innerText = 'Get Groups';
        this.getGroupsButton.addEventListener('click', () => this.controller.onGetGroupsButtonClick());

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

        this.groupTable = document.createElement('table');
        this.groupTable.classList.add('w3-table-all', 'w3-hoverable', 'w3-section');
        this.groupTable.addEventListener('click', (e) => this.controller.onTableClick(e));
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.groupLabel);
        this.form.appendChild(this.groupInput);
        this.form.appendChild(this.descriptionLabel);
        this.form.appendChild(this.descriptionInput);
        this.form.appendChild(this.createButton);
        this.form.appendChild(this.getGroupsButton);
        this.form.appendChild(this.confirmButton);
        this.form.appendChild(this.cancelButton);
        this.form.appendChild(this.groupTable);

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
            group: this.groupInput.value,
            description: this.descriptionInput.value
        }
        return values;
    }

    initializeTable() {
        let firstRow = document.createElement('tr');

        let idHeader = document.createElement('th');
        idHeader.innerText = 'Id';
        idHeader.style.display = 'none';

        let groupHeader = document.createElement('th');
        groupHeader.innerText = 'Group';

        let descriptionHeader = document.createElement('th');
        descriptionHeader.innerText = 'Description';

        let deleteHeader = document.createElement('th');
        deleteHeader.innerText = '';

        let updateHeader = document.createElement('th');
        updateHeader.innerText = '';

        firstRow.appendChild(idHeader);
        firstRow.appendChild(groupHeader);
        firstRow.appendChild(descriptionHeader);
        firstRow.appendChild(deleteHeader);
        firstRow.appendChild(updateHeader);

        this.groupTable.appendChild(firstRow);
    }

    addGroupToTable(id, group, description) {
        let row = document.createElement('tr');
        row.setAttribute('pkey', id);

        let idItem = document.createElement('td');
        idItem.innerText = id;
        idItem.style.display = 'none';

        let groupItem = document.createElement('td');
        groupItem.innerText = group;

        let descriptionItem = document.createElement('td');
        descriptionItem.innerText = description;

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
        row.appendChild(groupItem);
        row.appendChild(descriptionItem);
        row.appendChild(deleteContainer);
        row.appendChild(updateContainer);
        this.groupTable.appendChild(row);
    }

    clearTable() {
        while (this.groupTable.firstChild) {
            this.groupTable.removeChild(this.groupTable.firstChild);
        }
    }

    setGroupForUpdate(group) {
        this.groupInput.value = group.name;
        this.descriptionInput.value = group.description;

        this.cancelButton.style.visibility = 'visible';
        this.confirmButton.style.visibility = 'visible';
        this.createButton.disabled = true;
    }

    clearInputs() {
        this.groupInput.value = '';
        this.descriptionInput.value = '';
    }

    clearUpdate() {
        this.clearInputs();
        this.cancelButton.style.visibility = 'hidden';
        this.confirmButton.style.visibility = 'hidden';
        this.createButton.disabled = false;
        this.setSelectedRowId(null);
    }
}

customElements.define('x-form-view', GroupManagementFormView);

export { GroupManagementFormView };
