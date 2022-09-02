class FormModel {
    constructor() {
    }

    submit(data) {
        //fixed path to work with modal-dialog-window [index-modal.html]
        return fetch('../form/backend/authenticateUser.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }
}

export { FormModel };