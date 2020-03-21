'use strict';

import Pristine from 'pristinejs';

let validationFormsList = [];

const addToValidationFormsList = (form) => {
    validationFormsList.push(form);
    return validationFormsList;
};

const resetValidationFormsList = () => {
    validationFormsList.forEach(formValidator => formValidator.destroy());
    validationFormsList = [];
    return validationFormsList;
};

const getValidationFormsList = () => {
    return validationFormsList;
};

const trackFormSubmission = ({
    eventName, 
    eventCategory, 
    eventAction, 
    eventLabel, 
    eventValue, 
    conversionId, 
    conversionLabel
}) => {
    if (window.dataLayer === undefined) {
        return;
    }

    window.dataLayer.push({
        'event': eventName,
        'event-tracking-category': eventCategory,
        'event-tracking-action': eventAction,
        'event-tracking-label': eventLabel,
        'event-tracking-value': eventValue
    });

    if (conversionId && conversionLabel) {
        window.dataLayer.push({
            'event': 'google-ads-tracking',
            'conversion-id': conversionId,
            'conversion-label': conversionLabel
        });
    }
};

const setGoogleRecaptchaTokenInForm = (form, callback) => {
    if (!form) {
        return;
    }

    const recaptchaFieldElement = form.querySelector('input[name="recaptcha"]');

    if (!recaptchaFieldElement) {
        return;
    }

    grecaptcha
        .execute(googleRecaptchaClientId, {action: 'ajax/sendForm'})
        .then(token => {
            recaptchaFieldElement.value = token;
 
            if (callback) {
                callback();
            }
        });
};

const initValidation = () => {
    let forms = document.querySelectorAll('form');
    let defaultConfig = {
        // class of the parent element where the error/success class is added
        classTo: 'form__group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        // class of the parent element where error text element is appended
        errorTextParent: 'form__group',
        // type of element to create for the error text
        errorTextTag: 'div',
        // class of the error text element
        errorTextClass: 'form__error' 
    };

    [].forEach.call(forms, function(form) {
        let pristine = new Pristine(form, defaultConfig, true);
        addToValidationFormsList(pristine);
    });
};

const sendEventTrackingFromForm = (form) => {
    const eventCategory = form.getAttribute('data-ga-event-category');
    const eventAction = form.getAttribute('data-ga-event-action');
    const eventLabel = form.getAttribute('data-ga-event-label');
    const eventValue = form.getAttribute('data-ga-event-value');

    if (!eventCategory && !eventAction && !eventLabel) {
        return;
    }

    trackFormSubmission({
        eventName: 'contact-form-submission',
        eventCategory, 
        eventAction, 
        eventLabel, 
        eventValue
    });
};

const sendForm = ({form, url}) => {
    const isFormData = form.formData ? true : false;
    let data = isFormData ? form.formData : new FormData(form);

    form = form.formData ? form.formElement : form;
    let formWithValidation = getValidationFormsList().find(validForm => validForm.form === form);

    // check if the form is valid
    let isValid = formWithValidation.validate(); // returns true or false

    // let submitType = submitType || form.getAttribute('data-submit-type');
    let submitType = form.hasAttribute('data-submit-type') ? form.getAttribute('data-submit-type') : 'NORMAL';
    
    if (submitType === 'FILE') {
        return false;
    }

    if (isValid) {
        
        const loadingLayer = form.querySelector('.loading');
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonTextOriginal = submitButton.textContent || submitButton.innerText;
        const displayReponse = ({elementHtml, parent}) => {
            const div = document.createElement('div');
            div.innerHTML = elementHtml;
            parent.insertBefore(div, parent.firstChild);
        };

        // show to user that something happens
        loadingLayer.classList.add('loading--active');
        submitButton.textContent = 'Sending...';

        // init the request
        let request = new XMLHttpRequest();

        request.open('POST', url, true);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                let response = JSON.parse(request.response);

                submitButton.textContent = buttonTextOriginal;
                loadingLayer.classList.remove('loading--active');

                sendEventTrackingFromForm(form);
        
                if (response.url) {
                    window.location.href = response.url;
                } else {
                    loadingLayer.classList.remove('loading--active');
        
                    if (!form.querySelectorAll('.response--success').length) {
                        displayReponse({
                            elementHtml: `<div class="response response--success"><p>${response.message}</p></div>`,
                            parent: form
                        });
                    } else {
                        form.querySelector('.response--success p').textContent = response.message;
                    }
                }
        
                // remove error response if exists and reset the form
                let errorResponse = form.querySelector('.response--error');
        
                if (errorResponse) {
                    errorResponse.parentNode.removeChild(errorResponse);
                }

                resetForm(form);

                return false;

            } else {
                let errorMessage = '';
                let response = request.response;

                if (request.status !== 404) {
                    response = JSON.parse(request.response);
                }

                if (request.status === 422) {
                    let errors = response.errors;
                    
                    for (var field in errors) {
                        if (errors.hasOwnProperty(field) && errors[ field ].length) {
                            errorMessage += errors[ field ].join('<br>') + '<br>';
                        }
                    }
                } else if (request.status === 404) {
                    errorMessage = 'Page not found - incorrect url.';
                } else if (response.message) {
                    errorMessage = response.message;
                }

                if (errorMessage) {
                    if (!form.querySelectorAll('.response--error').length) {
                        displayReponse({
                            elementHtml: `<div class="response response--error"><p>${errorMessage}</p></div>`,
                            parent: form
                        });
                    } else {
                        form.querySelector('.response--error p').textContent = errorMessage;
                    }
                }

                // remove success response if exists
                let responseOk = form.querySelector('.response--success');

                if (responseOk) {
                    responseOk.parentNode.removeChild(responseOk);
                }

                submitButton.textContent = buttonTextOriginal;
                loadingLayer.classList.remove('loading--active');

                return false;
            }
        };

        // send the request
        request.send(data);
    }
    return false;
};

const resetForm = (form) => {
    form.reset();

    let allFormInputs = form.querySelectorAll('.filled');
    [].forEach.call(allFormInputs, function (singleFormInput) {
        singleFormInput.classList.remove('filled');
    });
};

const submitForm = ({form, url}) => {
    if (!form && !url) {
        console.error('Form or/and form URI not specified.');
        return false;
    }

    let formWithValidation = getValidationFormsList().find(validForm => validForm.form === form);
    let isValid = formWithValidation.validate(); // returns true or false

    if (!isValid) {
        return false;
    }

    let grecaptchaExist = false;
    let googleRecaptchaClientIdExist = false;

    if (typeof grecaptcha === 'undefined' || grecaptcha === null) {
        grecaptchaExist = false;
    } else {
        grecaptchaExist = true;
    }

    if (typeof googleRecaptchaClientId === 'undefined' || googleRecaptchaClientId === null) {
        googleRecaptchaClientIdExist = false;
    } else {
        googleRecaptchaClientIdExist = true;
    }

    if (grecaptchaExist && googleRecaptchaClientIdExist) {
        setGoogleRecaptchaTokenInForm(form, () => {
            sendForm({form, url});
        });
    } else {
        sendForm({form, url});
    }

    return false;
};

export {submitForm, initValidation, resetValidationFormsList};
