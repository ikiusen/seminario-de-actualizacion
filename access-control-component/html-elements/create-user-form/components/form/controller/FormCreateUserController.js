class FormCreateUserController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onCreateButtonClick() {
        this.model.createUser(this.view.getFormData()).then((response) => { console.log(response); });
    }

    onGetUsersButtonClick() {
        this.model.getUsers().then((response) => { console.log(response); });
    }

    onDeleteButtonClick() {
        this.model.deleteUser(this.view.getUserToDelete()).then((response) => { console.log(response); });
    }

    onUpdateButtonClick() {
        this.model.updateUser(this.view.getUserToUpdate()).then((response) => { console.log(response); });
    }

}

export { FormCreateUserController };