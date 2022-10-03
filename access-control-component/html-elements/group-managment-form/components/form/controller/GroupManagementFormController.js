class GroupManagementFormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onCreateButtonClick() {
        this.model.createGroup(this.view.getFormData()).then((response) => {
            console.log(response);
            this.view.clearInputs();
        });
    }

    onGetGroupsButtonClick() {
        this.getGroups();
    }

    onDeleteButtonClick(e) {
        let data = {
            "id": e.target.parentElement.parentElement.getAttribute('pkey')
        }
        this.model.deleteGroup(data).then((response) => {
            console.log(response);
            this.getGroups();
        });
    }

    onUpdateButtonClick(e) {
        let id = e.target.parentElement.parentElement.getAttribute('pkey');
        let data = {
            "id": id
        }
        this.view.setSelectedRowId(id);
        this.model.getGroupById(data).then((response) => {
            this.view.setGroupForUpdate(response[0]);
        })
    }

    onCancelButtonClick() {
        this.view.clearUpdate();
    }

    onConfirmButtonClick() {
        this.model.updateGroup(this.view.getFormData()).then((response) => {
            console.log(response);
            this.view.clearUpdate();
            this.getGroups();
        })
    }

    onTableClick(e) {
        if (e.target.tagName == 'BUTTON' && e.target.innerText == "Delete") {
            this.onDeleteButtonClick(e);
        } else if (e.target.tagName == 'BUTTON' && e.target.innerText == "Update") {
            this.onUpdateButtonClick(e);
        }
    }

    getGroups() {
        this.model.getGroups().then((response) => {
            if (this.view.GroupList.firstChild) {
                this.view.clearTable();
            }
            this.view.initializeTable();
            response.forEach(element => {
                this.view.addGroupToTable(element.id, element.name, element.description);
            });
        });
    }
}

export { GroupManagementFormController };