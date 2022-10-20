class FormModel {
    constructor() {
    }

    submit(data) {
        let requestParameters = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        let request = new Request('./backend/loginWithToken.php', requestParameters);
        return fetch(request)
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