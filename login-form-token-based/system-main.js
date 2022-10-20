/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
import { FormModel } from './html-elements/system-form/model/FormModel.js';
import { FormView } from './html-elements/system-form/view/FormView.js';

function main() {
    let myFormModel = new FormModel();
    let myFormView = new FormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);