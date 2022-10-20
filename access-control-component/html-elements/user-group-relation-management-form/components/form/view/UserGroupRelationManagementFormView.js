/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
import { UserGroupRelationManagementFormController } from '../controller/UserGroupRelationManagementFormController.js';

class UserGroupRelationManagementFormView extends HTMLElement {
    constructor(model) {
        super();

        this.model = model;
        this.controller = new UserGroupRelationManagementFormController(this, this.model);

        this.__selectedAction = null;

        this.form = document.createElement('div');
        this.form.classList.add('w3-container', 'w3-light-grey', 'w3-leftbar', 'w3-border', 'w3-card-4', 'w3-bottombar', 'w3-margin');
        this.form.style.maxWidth = '650px';

        this.mainHeader = document.createElement('h1');
        this.mainHeader.innerText = 'User-Group Management'

        this.addUserToGroupButton = document.createElement('button');
        this.addUserToGroupButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-bottom');
        this.addUserToGroupButton.innerText = 'Add user to group';
        this.addUserToGroupButton.addEventListener('click', () => this.controller.onAddUserToGroupButtonClick());

        this.removeUserFromGroupButton = document.createElement('button');
        this.removeUserFromGroupButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-left', 'w3-margin-right', 'w3-margin-bottom');
        this.removeUserFromGroupButton.innerText = 'Remove user from group';
        this.removeUserFromGroupButton.addEventListener('click', () => this.controller.onRemoveUserFromGroupButtonClick());

        this.getUsersFromGroupButton = document.createElement('button');
        this.getUsersFromGroupButton.classList.add('w3-button', 'w3-round', 'w3-blue', 'w3-hover-dark-grey', 'w3-margin-bottom');
        this.getUsersFromGroupButton.innerText = 'Get users from group';
        this.getUsersFromGroupButton.addEventListener('click', () => this.controller.onGetUsersFromGroupButtonClick());

        this.userLabel = document.createElement('label');
        this.userLabel.classList.add('w3-label');

        this.userSelection = document.createElement('select');
        this.userSelection.classList.add('w3-input', 'w3-border', 'w3-section');

        this.groupLabel = document.createElement('label');
        this.groupLabel.classList.add('w3-label');

        this.groupSelection = document.createElement('select');
        this.groupSelection.classList.add('w3-input', 'w3-border', 'w3-section');

        this.confirmButton = document.createElement('button');
        this.confirmButton.classList.add('w3-button', 'w3-round', 'w3-green', 'w3-hover-dark-grey', 'w3-margin-bottom');
        this.confirmButton.innerText = 'Confirm';
        this.confirmButton.addEventListener('click', () => this.controller.onConfirmButtonClick());

        this.cancelButton = document.createElement('button');
        this.cancelButton.classList.add('w3-button', 'w3-round', 'w3-red', 'w3-hover-dark-grey', 'w3-margin-left', 'w3-margin-bottom');
        this.cancelButton.innerText = 'Cancel';
        this.cancelButton.addEventListener('click', () => this.controller.onCancelButtonClick());

        this.userTable = document.createElement('table');
        this.userTable.classList.add('w3-table-all', 'w3-hoverable', 'w3-section');
    }

    connectedCallback() {
        this.form.appendChild(this.mainHeader);
        this.form.appendChild(this.addUserToGroupButton);
        this.form.appendChild(this.removeUserFromGroupButton);
        this.form.appendChild(this.getUsersFromGroupButton);

        this.appendChild(this.form);
    }

    setSelectedAction(value) {
        this.__selectedAction = value;
    }

    getSelectedAction() {
        return this.__selectedAction;
    }

    setAddUserToGroup() {
        this.setSelectedAction('add');
        this.userLabel.innerText = 'Add User:';
        this.groupLabel.innerText = 'To Group:';

        this.form.appendChild(this.userLabel);
        this.form.appendChild(this.userSelection);
        this.form.appendChild(this.groupLabel);
        this.form.appendChild(this.groupSelection);
        this.form.appendChild(this.confirmButton);
        this.form.appendChild(this.cancelButton);

        this.userSelection.addEventListener('change', () => this.controller.onUserSelectionChange());
    }

    setRemoveUserFromGroup() {
        this.setSelectedAction('remove');
        this.userLabel.innerText = 'Remove User:';
        this.groupLabel.innerText = 'From Group:';

        this.form.appendChild(this.userLabel);
        this.form.appendChild(this.userSelection);
        this.form.appendChild(this.groupLabel);
        this.form.appendChild(this.groupSelection);
        this.form.appendChild(this.confirmButton);
        this.form.appendChild(this.cancelButton);

        this.userSelection.addEventListener('change', () => this.controller.onUserSelectionChange());
    }

    setGetUsersFromGroup() {
        this.setSelectedAction('get');
        this.groupLabel.innerText = 'Get users from group:';
        this.form.appendChild(this.groupLabel);
        this.form.appendChild(this.groupSelection);
        this.form.appendChild(this.userTable);
        this.form.appendChild(this.confirmButton);
        this.form.appendChild(this.cancelButton);

        this.groupSelection.addEventListener('change', () => this.controller.onGroupSelectionChange());
    }

    initializeTable() {
        let firstRow = document.createElement('tr');
        let idHeader = document.createElement('th');
        idHeader.innerText = 'Id';
        idHeader.style.display = 'none';
        let userHeader = document.createElement('th');
        userHeader.innerText = 'User';
        firstRow.appendChild(idHeader);
        firstRow.appendChild(userHeader);
        this.userTable.appendChild(firstRow);
    }

    addUserToSelection(id, user) {
        let userOption = document.createElement('option');
        userOption.innerText = user;
        userOption.value = user;
        userOption.setAttribute('id', id);

        this.userSelection.appendChild(userOption);
    }

    addGroupToSelection(id, group) {
        let groupOption = document.createElement('option');
        groupOption.innerText = group;
        groupOption.value = group;
        groupOption.setAttribute('id', id);

        this.groupSelection.appendChild(groupOption);
    }

    addUserToTable(id, user) {
        let row = document.createElement('tr');
        row.setAttribute('pkey', id);

        let idItem = document.createElement('td');
        idItem.innerText = id;
        idItem.style.display = 'none';

        let userItem = document.createElement('td');
        userItem.innerText = user;

        row.appendChild(idItem);
        row.appendChild(userItem);
        this.userTable.appendChild(row);
    }

    clearUserSelection() {
        while (this.userSelection.firstChild) {
            this.userSelection.removeChild(this.userSelection.firstChild);
        }
    }

    clearGroupSelection() {
        while (this.groupSelection.firstChild) {
            this.groupSelection.removeChild(this.groupSelection.firstChild);
        }
    }

    clearTable() {
        while (this.userTable.firstChild) {
            this.userTable.removeChild(this.userTable.firstChild);
        }
    }

    getSelectedUserId() {
        return this.userSelection.options[this.userSelection.selectedIndex].id;
    }

    getSelectedGroupId() {
        return this.groupSelection.options[this.groupSelection.selectedIndex].id;
    }

    clearSelection() {
        if (this.getSelectedAction() != null) {
            this.clearUserSelection();
            this.clearGroupSelection();
            this.clearTable();
            this.userSelection.removeEventListener('change', () => this.controller.onUserSelectionChange());
            this.form.removeChild(this.groupLabel);
            this.form.removeChild(this.groupSelection);
            this.form.removeChild(this.confirmButton);
            this.form.removeChild(this.cancelButton);
            if (this.getSelectedAction() == 'get') {
                this.form.removeChild(this.userTable);
                this.groupSelection.removeEventListener('change', () => this.controller.onGroupSelectionChange());
            } else {
                this.form.removeChild(this.userLabel);
                this.form.removeChild(this.userSelection);
            }
            this.setSelectedAction(null);
        }
    }
}

customElements.define('x-user-group-relation-management-form-view', UserGroupRelationManagementFormView);

export { UserGroupRelationManagementFormView };