function initForm(config) {
  return {
    formId: config.formUniqueId,
    formActionUrl: config.url,
    attachedFile: document.querySelector(`[data-form-${config.formUniqueId}="attache-file"]`),
    showForm: true,
    showFooterTitle: true,
    showSuccess: false,
    isLoading: false,
    validateComponent: null,
    init() {
      this.validateComponent = new Pristine(document.getElementById(`form_${this.formId}`));
    },
    // visual part
    handleChangeAttachInput(el) {
      const fileName = el.files[0].name;
      this.attachedFile.classList.remove("_hidden");
      this.attachedFile.innerHTML = fileName;
    },
    removeAttachedFile() {
      this.attachedFile.classList.add("_hidden");
      this.attachedFile.value = "";
    },
    toggleSuccessMessage() {
      this.showForm = !this.showForm;
      this.showFooterTitle = !this.showFooterTitle;
      this.showSuccess = !this.showSuccess;
      document.getElementById(`form_${config.formUniqueId}`).reset();
    },
    // form submit
    submitForm(event) {
      event.preventDefault();

      let formData = new FormData(document.querySelector(`#form_${this.formId}`));
      formData.append("form_key", this.getFormKey());

      const request = new XMLHttpRequest();

      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          const status = request.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            this.handleAjaxSuccess();
          } else {
            this.handleAjaxSuccess();
          }
        }
        this.isLoading = false;
      };

      // form validate
      // const validateComponent = new Pristine(document.getElementById(`form_${this.formId}`));
      const valid = this.validateComponent.validate();
      const formErrors = this.validateComponent.getErrors();
      // ====================================================================================

      if (valid) {
        request.open("POST", this.formActionUrl);
        request.send(formData);
        this.isLoading = true;
      } else if (formErrors.length) {
        this.clearFieldErrors();
        this.setErrorToFields(formErrors, this.validateComponent);
      }
    },
    handleAjaxSuccess() {
      this.toggleSuccessMessage();
    },
    // validate single element
    validate(input, silent) {
      const valid = this.validateComponent.validate(input, silent);
      if (valid) {
        this.clearFieldErrors(input);
        input.classList.add("is-valid");
      } else {
        this.clearFieldErrors(input);

        const errors = this.validateComponent.getErrors(input);
        this.setErrorToSpecificField(errors, input);
      }
    },
    // display/hide form errors
    setErrorToSpecificField(errors, input) {
      const errorNode = `<li class="field-error">${errors[0]}</li>`;
      if (!input.nextElementSibling.classList.contains("field-error")) {
        input.insertAdjacentHTML("afterend", errorNode);
        input.classList.add("has-error");
      }
    },
    setErrorToFields(formErrors) {
      formErrors.forEach((error) => {
        const errorNode = `<li class="field-error">${error.errors[0]}</li>`;
        if (!error.input.nextElementSibling.classList.contains("field-error")) {
          error.input.insertAdjacentHTML("afterend", errorNode);
          error.input.classList.add("has-error");
        }
      });
    },
    clearFieldErrors(input = null) {
      const existedErrors = input
        ? input.nextSibling
        : document.getElementById(`form_${this.formId}`).querySelectorAll(".field-error");

      if (Array.isArray(existedErrors)) {
        existedErrors.forEach((el) => {
          if (el.classList && el.classList.contains("field-error")) {
            el.previousElementSibling.classList.remove("has-error");
            el.remove();
          }
        });
      } else if (existedErrors.classList && existedErrors.classList.contains("field-error")) {
        existedErrors.previousElementSibling.classList.remove("has-error");
        existedErrors.remove();
      }
    },
    // formkey functions (get/generate)
    getFormKey() {
      let formKey = window.getCookie("form_key");

      if (!formKey) {
        formKey = this.generateFormKey();
        window.setCookie("form_key", formKey);
      }

      return formKey;
    },
    generateFormKey() {
      const allowedCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        length = 16;

      let formKey = "",
        charactersLength = allowedCharacters.length;

      for (var i = 0; i < length; i++) {
        formKey += allowedCharacters[Math.round(Math.random() * (charactersLength - 1))];
      }

      return formKey;
    },
  };
}
