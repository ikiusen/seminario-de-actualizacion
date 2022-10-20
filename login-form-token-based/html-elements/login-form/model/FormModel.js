/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
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