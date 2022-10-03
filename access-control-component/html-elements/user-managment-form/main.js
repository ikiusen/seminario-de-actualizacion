import { UserManagementFormModel } from './components/form/model/UserManagementFormModel.js';
import { UserManagementFormView } from './components/form/view/UserManagementFormView.js';

function main() {
    let myFormModel = new UserManagementFormModel();
    let myFormView = new UserManagementFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);