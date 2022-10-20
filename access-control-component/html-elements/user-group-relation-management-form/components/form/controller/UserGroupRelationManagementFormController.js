/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class UserGroupRelationManagementFormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onAddUserToGroupButtonClick() {
        this.view.clearSelection();
        this.view.setAddUserToGroup();
        this.getUsers();
    }

    onRemoveUserFromGroupButtonClick() {
        this.view.clearSelection();
        this.view.setRemoveUserFromGroup();
        this.getUsers();
    }

    onGetUsersFromGroupButtonClick() {
        this.view.clearSelection();
        this.view.setGetUsersFromGroup();
        this.getGroups();
    }

    onCancelButtonClick() {
        this.view.clearSelection();
    }

    onConfirmButtonClick() {
        this.doAction();
    }

    onUserSelectionChange() {
        this.getGroups();
    }

    onGroupSelectionChange() {
        this.getUsersFromGroup();
    }

    getUsers() {
        this.model.getUsers().then((response) => {
            if (this.view.userSelection.firstChild) {
                this.view.clearUserSelection();
            }
            response.forEach(element => {
                this.view.addUserToSelection(element.id, element.name);
            });
            this.getGroups();
        });
    }

    getGroups() {
        if (this.view.getSelectedAction() == 'add') {
            let userId = this.view.getSelectedUserId();
            let data = {
                "userId": userId
            }
            this.model.getGroupsWhereUserIsNot(data).then((response) => {
                if (this.view.groupSelection.firstChild) {
                    this.view.clearGroupSelection();
                }
                response.forEach(element => {
                    this.view.addGroupToSelection(element.id, element.name);
                });
            });
        } else if (this.view.getSelectedAction() == 'remove') {
            let userId = this.view.getSelectedUserId();
            let data = {
                "userId": userId
            }
            this.model.getGroupsWhereUserIsIn(data).then((response) => {
                if (this.view.groupSelection.firstChild) {
                    this.view.clearGroupSelection();
                }
                response.forEach(element => {
                    this.view.addGroupToSelection(element.id, element.name);
                });
            });
        } else {
            this.model.getGroups().then((response) => {
                if (this.view.groupSelection.firstChild) {
                    this.view.clearGroupSelection();
                }
                response.forEach(element => {
                    this.view.addGroupToSelection(element.id, element.name);
                });
            });
        }
    }

    doAction() {
        if (this.view.getSelectedAction() == 'add') {
            this.addUserToGroup();
        } else if (this.view.getSelectedAction() == 'remove') {
            this.removeUserFromGroup();
        } else if (this.view.getSelectedAction() == 'get') {
            this.getUsersFromGroup();
        }
    }

    addUserToGroup() {
        let data = {
            "userId": this.view.getSelectedUserId(),
            "groupId": this.view.getSelectedGroupId()
        }
        this.model.addUserToGroup(data).then((response) => {
            this.getGroups();
            console.log(response);
        });
    }

    removeUserFromGroup() {
        let data = {
            "userId": this.view.getSelectedUserId(),
            "groupId": this.view.getSelectedGroupId()
        }
        this.model.removeUserFromGroup(data).then((response) => {
            this.getGroups();
            console.log(response);
        });
    }

    getUsersFromGroup() {
        let data = {
            "groupId": this.view.getSelectedGroupId()
        }
        this.model.getUsersFromGroup(data).then((response) => {
            if (this.view.userTable.firstChild) {
                this.view.clearTable();
            }
            this.view.initializeTable();
            response.forEach(element => {
                this.view.addUserToTable(element.id, element.name);
            });
        });
    }
}

export { UserGroupRelationManagementFormController };