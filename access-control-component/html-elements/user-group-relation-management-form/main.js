import { UserGroupRelationManagementFormModel } from './components/form/model/UserGroupRelationManagementFormModel.js';
import { UserGroupRelationManagementFormView } from './components/form/view/UserGroupRelationManagementFormView.js';

function main() {
    let myFormModel = new UserGroupRelationManagementFormModel();
    let myFormView = new UserGroupRelationManagementFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);