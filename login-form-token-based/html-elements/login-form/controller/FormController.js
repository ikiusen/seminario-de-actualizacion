class FormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onSubmit() {
        this.model.submit(this.view.getFormData()).then((response) => {
            if (!response.startsWith("Error")) {
                //adds a new history item, and lets you back track with the back button
                //window.location.href = 'hello.html';
                //doesnt add a new item, and the back item doesnt consider the previous page
                window.sessionStorage.setItem('token', response);
                window.location.replace('system-index.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };