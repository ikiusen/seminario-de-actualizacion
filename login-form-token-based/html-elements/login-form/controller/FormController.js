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

    onSubmit() {
        this.model.submit(this.view.getFormData()).then((response) => {
            if (!response.startsWith("Error")) {
                //adds a new history item, and lets you back track with the back button
                //window.location.href = 'hello.html';
                //doesnt add a new item, and the back item doesnt consider the previous page
                window.sessionStorage.setItem('token', response);
                window.location.replace('system-index.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };