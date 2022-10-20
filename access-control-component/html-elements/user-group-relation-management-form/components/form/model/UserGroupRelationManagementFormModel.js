/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class UserGroupRelationManagementFormModel {
    constructor() { }

    getUsers() {
        return fetch('./backend/getAllUsers.php', { method: 'POST', body: '' }).then(response => response.json());
    }

    getGroups() {
        return fetch('./backend/getAllGroups.php', { method: 'POST', body: '' }).then(response => response.json());
    }

    getGroupsWhereUserIsNot(data) {
        return fetch('./backend/getGroupsWhereUserIsNot.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getGroupsWhereUserIsIn(data) {
        return fetch('./backend/getGroupsWhereUserIsIn.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    addUserToGroup(data) {
        return fetch('./backend/addUserToGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    removeUserFromGroup(data) {
        return fetch('./backend/removeUserFromGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getUsersFromGroup(data) {
        return fetch('./backend/getUsersFromGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }
}

export { UserGroupRelationManagementFormModel };