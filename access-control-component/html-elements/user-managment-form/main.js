/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
import { UserManagementFormModel } from './components/form/model/UserManagementFormModel.js';
import { UserManagementFormView } from './components/form/view/UserManagementFormView.js';

function main() {
    let myFormModel = new UserManagementFormModel();
    let myFormView = new UserManagementFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);