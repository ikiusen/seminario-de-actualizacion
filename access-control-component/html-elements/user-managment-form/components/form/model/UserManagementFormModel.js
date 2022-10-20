/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class UserManagementFormModel {
    constructor() {
    }

    createUser(data) {
        return fetch('./backend/createUser.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getUsers() {
        return fetch('./backend/getAllUsers.php', { method: 'POST', body: '' }).then(response => response.json());
    }

    deleteUser(data) {
        return fetch('./backend/deleteUser.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    updateUser(data) {
        return fetch('./backend/updateUser.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }

    getUserById(data) {
        return fetch('./backend/getUserById.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }
}

export { UserManagementFormModel };