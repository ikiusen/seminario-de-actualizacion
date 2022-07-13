import { FormCreateUserModel } from './model/FormCreateUserModel.js';
import { FormCreateUserView } from './view/FormCreateUserView.js';

function main() {
    let myFormModel = new FormCreateUserModel();
    let myFormView = new FormCreateUserView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);