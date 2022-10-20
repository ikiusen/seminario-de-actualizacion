/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
class FormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onGetUsersButtonClick() {
        this.model.getAllUsers().then((response) => {
            console.log(response);
        });
    }

    onLogOutButtonClick() {
        this.model.logOut().then((response) => {
            if (!response.startsWith("Error")) {
                window.sessionStorage.removeItem('token')
                window.location.replace('index.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };