(function(formValidation) {
    function formValidationComponent(formElement) {
        Pristine.addValidator("phone-custom", function(value) {
            return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        }, 'Enter correct phone number', 5, false);
    }
    formValidation.global = formValidationComponent;
    
}(window.formValidation = window.formValidation || {}));