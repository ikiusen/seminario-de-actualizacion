class FormCreateUserController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onCreateButtonClick() {
        this.model.createUser(this.view.getFormData()).then((response) => { console.log(response); });
    }

    onGetUsersButtonClick() {
        this.model.getUsers().then((response) => {
            if (this.view.userList.firstChild) {
                this.view.clearTable();
            }
            this.view.initializeTable();
            response.forEach(element => {
                this.view.addUserToTable(element.id, element.name);
            });
        });
    }

    onDeleteButtonClick(e) {
        console.log(e.target.parentNode.parentNode.childNodes[0].innerText);
        let data = {
            "id": e.target.parentNode.parentNode.childNodes[0].innerText
        }
        this.model.deleteUser(data).then((response) => {
            console.log(response);
        });
    }

    onUpdateButtonClick(e) {
        if (typeof e.target.parentNode.parentNode.childNodes[0].innerText == 'number') {
            console.log(e.target.parentNode.parentNode.childNodes[0].innerText);
            //toDo: finish implementation;
            //this.model.updateUser(this.view.getUserToUpdate()).then((response) => { console.log(response); });
        }
    }

    onTableClick(e) {
        if (e.target.innerText == "Delete") {
            this.onDeleteButtonClick(e);
        } else if (e.target.innerText == "Update") {
            this.onUpdateButtonClick(e);
        }
    }

}

export { FormCreateUserController };