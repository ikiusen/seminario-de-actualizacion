class FormCreateUserController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onCreateButtonClick() {
        this.model.createUser(this.view.getFormData()).then((response) => { console.log(response); });
    }

    onGetUsersButtonClick() {
        this.getUsers();
    }

    getUsers() {
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
        let data = {
            "id": e.target.parentElement.parentElement.getAttribute('pkey')
        }
        this.model.deleteUser(data).then((response) => {
            console.log(response);
            this.getUsers();
        });
    }

    onUpdateButtonClick(e) {
        let data = {
            "id": e.target.parentElement.parentElement.getAttribute('pkey')
        }
        //toDo: finish implementation;
        //this.model.updateUser(this.view.getUserToUpdate()).then((response) => { console.log(response); });
    }

    onTableClick(e) {
        if (e.target.tagName == 'BUTTON' && e.target.innerText == "Delete") {
            this.onDeleteButtonClick(e);
        } else if (e.target.tagName == 'BUTTON' && e.target.innerText == "Update") {
            this.onUpdateButtonClick(e);
        }
    }

}

export { FormCreateUserController };