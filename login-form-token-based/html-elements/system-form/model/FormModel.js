/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class FormModel {
    constructor() { }

    getAllUsers() {
        let requestHeader = new Headers();
        requestHeader.append("X-Session-Key", sessionStorage.getItem("token"));
        let requestParameters = {
            method: 'POST',
            headers: requestHeader,
        };
        let request = new Request('./backend/getAllUsers.php', requestParameters);
        return fetch(request).then(response => response.json());
    }

    logOut() {
        let requestHeader = new Headers();
        requestHeader.append("X-Session-Key", sessionStorage.getItem("token"));
        let requestParameters = {
            method: 'POST',
            headers: requestHeader,
        };
        let request = new Request('./backend/logOut.php', requestParameters);
        return fetch(request)
            .then(response => response.json())
            .then(response => {
                if (response["status"] == "ok") {
                    return response["description"];
                } else {
                    return "Error processing request " + response["description"];
                }
            });
    }
}

export { FormModel };