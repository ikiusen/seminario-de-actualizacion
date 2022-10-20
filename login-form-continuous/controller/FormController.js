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
                window.location.replace('hello.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };