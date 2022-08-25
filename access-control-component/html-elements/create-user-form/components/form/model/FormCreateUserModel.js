class FormCreateUserModel {
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
}

export { FormCreateUserModel };