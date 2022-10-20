/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class GroupManagementFormModel {
    constructor() {
    }

    createGroup(data) {
        return fetch('./backend/createGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getGroups() {
        return fetch('./backend/getAllGroups.php', { method: 'POST', body: '' }).then(response => response.json());
    }

    deleteGroup(data) {
        return fetch('./backend/deleteGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    updateGroup(data) {
        return fetch('./backend/updateGroup.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getGroupById(data) {
        return fetch('./backend/getGroupById.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }
}

export { GroupManagementFormModel };