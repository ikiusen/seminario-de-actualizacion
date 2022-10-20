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