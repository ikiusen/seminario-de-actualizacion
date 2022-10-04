class FormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onSubmit() {
        this.model.submit(this.view.getFormData()).then((response) => {
            if (!response.startsWith("Error")) {
                window.location.replace('hello.html');
            } else {
                console.log(response);
            }
        });
    }
}

export { FormController };