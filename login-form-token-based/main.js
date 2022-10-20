import { FormModel } from './html-elements/login-form/model/FormModel.js';
import { FormView } from './html-elements/login-form/view/FormView.js';

function main() {
    let myFormModel = new FormModel();
    let myFormView = new FormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);