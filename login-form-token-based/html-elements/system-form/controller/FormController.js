class FormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onGetUsersButtonClick() {
        this.model.getAllUsers().then((response) => {
            console.log(response);
        });
    }

    onLogOutButtonClick() {
        this.model.logOut().then((response) => {
            if (!response.startsWith("Error")) {
                window.sessionStorage.removeItem('token')
                window.location.replace('index.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };