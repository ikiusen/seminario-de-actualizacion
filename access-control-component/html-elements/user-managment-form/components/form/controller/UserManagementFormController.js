class UserManagementFormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onCreateButtonClick() {
        this.model.createUser(this.view.getFormData()).then((response) => {
            console.log(response);
            this.view.clearInputs();
        });
    }

    onGetUsersButtonClick() {
        this.getUsers();
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
        let id = e.target.parentElement.parentElement.getAttribute('pkey');
        let data = {
            "id": id
        }
        this.view.setSelectedRowId(id);
        this.model.getUserById(data).then((response) => {
            this.view.setUserForUpdate(response[0].name);
        })
    }

    onCancelButtonClick() {
        this.view.clearUpdate();
    }

    onConfirmButtonClick() {
        this.model.updateUser(this.view.getFormData()).then((response) => {
            console.log(response);
            this.view.clearUpdate();
            this.getUsers();
        })
    }

    onTableClick(e) {
        if (e.target.tagName == 'BUTTON' && e.target.innerText == "Delete") {
            this.onDeleteButtonClick(e);
        } else if (e.target.tagName == 'BUTTON' && e.target.innerText == "Update") {
            this.onUpdateButtonClick(e);
        }
    }

    getUsers() {
        this.model.getUsers().then((response) => {
            if (this.view.userTable.firstChild) {
                this.view.clearTable();
            }
            this.view.initializeTable();
            response.forEach(element => {
                this.view.addUserToTable(element.id, element.name);
            });
        });
    }
}

export { UserManagementFormController };