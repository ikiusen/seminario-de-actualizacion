class FormModel {
    constructor() {
    }

    submit(data) {
        //toDO fix path
        return fetch('./backend/login.php', { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
    }
}

export { FormModel };