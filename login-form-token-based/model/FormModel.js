class FormModel {
    constructor() {
    }

    submit(data) {
        return fetch('./backend/loginWithToken.php', { method: 'POST', body: JSON.stringify(data) })
            .then(response => response.json())
            .then(response => {
                if (response["status"] == "ok") {
                    //if using authenticateUser.php change token to userId
                    return response["responseData"].token;
                } else {
                    return "Error processing request " + response["description"];
                }
            });
    }
}

export { FormModel };