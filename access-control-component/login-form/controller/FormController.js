class FormController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    onSubmit() {
        this.model.submit(this.view.getFormData()).then((response) => {
            console.log(response); 
            if(response.startsWith("Error")) {
                console.log("hi");
            }
        });
    }

}

export { FormController };