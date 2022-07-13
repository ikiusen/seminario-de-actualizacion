class CreateUserFormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onSubmit() {
        this.model.submit(this.view.getFormData()).then(response => { alert(response); });
    }

}

export { CreateUserFormController };