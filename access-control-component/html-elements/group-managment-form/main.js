import { GroupManagementFormModel } from './components/form/model/GroupManagementFormModel.js';
import { GroupManagementFormView } from './components/form/view/GroupManagementFormView.js';

function main() {
    let myFormModel = new GroupManagementFormModel();
    let myFormView = new GroupManagementFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);