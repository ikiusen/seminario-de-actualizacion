/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

import { GroupManagementFormModel } from './components/group-management-form/model/GroupManagementFormModel.js';
import { GroupManagementFormView } from './components/group-management-form/view/GroupManagementFormView.js';

function main() {
    let groupManagementModel = new GroupManagementFormModel();
    let groupManagementView = new GroupManagementFormView(groupManagementModel);

    document.body.appendChild(groupManagementView);
}

window.addEventListener('load', main);