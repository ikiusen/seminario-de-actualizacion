import { CreateUserFormModel } from './model/CreateUserFormModel.js';
import { CreateUserFormView } from './view/CreateUserFormView.js';

function main() {
    let myFormModel = new CreateUserFormModel();
    let myFormView = new CreateUserFormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);