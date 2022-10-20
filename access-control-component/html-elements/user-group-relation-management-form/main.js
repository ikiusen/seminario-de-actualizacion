/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
import { UserGroupRelationManagementFormModel } from './components/form/model/UserGroupRelationManagementFormModel.js';
import { UserGroupRelationManagementFormView } from './components/form/view/UserGroupRelationManagementFormView.js';

function main() {
    let myFormModel = new UserGroupRelationManagementFormModel();
    let myFormView = new UserGroupRelationManagementFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);