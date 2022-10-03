import { GroupManagementFormModel } from './components/group-management-form/model/GroupManagementFormModel.js';
import { GroupManagementFormView } from './components/group-management-form/view/GroupManagementFormView.js';

function main() {
    let groupManagementModel = new GroupManagementFormModel();
    let groupManagementView = new GroupManagementFormView(groupManagementModel);

    document.body.appendChild(groupManagementView);
}

window.addEventListener('load', main);