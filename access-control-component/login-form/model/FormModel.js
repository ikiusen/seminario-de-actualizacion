class FormModel {
    constructor() {
    }

    submit(data) {
        return fetch('./backend/authenticateUser.php', { method: 'POST', body: JSON.stringify(data) })
            .then(response => response.json())
            .then(response => {
                if (response["status"] == "ok") {
                    return response["responseData"].user_id;
                } else {
                    return "Error processing request " + response["description"];
                }
            });
    }
}

export { FormModel };