import { FormCreateUserModel } from './components/form/model/FormCreateUserModel.js';
import { FormCreateUserView } from './components/form/view/FormCreateUserView.js';

function main() {
    let myFormModel = new FormCreateUserModel();
    let myFormView = new FormCreateUserView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);