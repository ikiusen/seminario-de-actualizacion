import { FormModel } from './model/FormModel.js';
import { FormView } from './view/FormView.js';

function main() {
    let myFormModel = new FormModel();
    let myFormView = new FormView(myFormModel);

    document.body.appendChild(myFormView);
}

window.addEventListener('load', main);