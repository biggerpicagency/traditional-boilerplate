'use strict';

import $ from 'jquery';

const submitForm = ({form, url}) => {
    let data = $(form).serialize();

    const loadingLayer = form.querySelector('.loading');
    const submitButton = form.querySelector('button[type="submit"]');
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
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.response);

            submitButton.textContent = 'Submit';
            loadingLayer.classList.remove('loading--active');
    
            if (response.url) {
                window.location.href = response.url;
            } else {
                loadingLayer.classList.remove('loading--active');
    
                if (!form.querySelectorAll('.form__response--ok').length) {
                    displayReponse({
                        elementHtml: `<div class="form__response form__response--ok"><p>${response.message}</p></div>`,
                        parent: form
                    });
                } else {
                    form.querySelector('.form__response--ok p').textContent = response.message;
                }
            }
    
            // remove error response if exists and reset the form
            let errorResponse = form.querySelector('.form__response--error');
    
            if (errorResponse) {
                errorResponse.parentNode.removeChild(errorResponse);
            }

            form.reset();

        } else {
            let errorMessage = '';
            let response = request.response;

            if (request.status !== 404) {
                response = JSON.parse(request.response);
            }

            if (request.status === 422) {
                for (var field in response) {
                    if (response.hasOwnProperty(field)) {
                        errorMessage += response[ field ].join('<br>') + '<br>';
                    }
                }
            } else if (request.status === 404) {
                errorMessage = 'Page not found - incorrect url.';
            } else if (response.message) {
                errorMessage = response.message;
            }

            if (errorMessage) {
                if (!form.querySelectorAll('.form__response--error').length) {
                    displayReponse({
                        elementHtml: `<div class="form__response form__response--error"><p>${errorMessage}</p></div>`,
                        parent: form
                    });
                } else {
                    form.querySelector('.form__response--error p').textContent = errorMessage;
                }
            }

            // remove success response if exists
            let responseOk = form.querySelector('.form__response--ok');

            if (responseOk) {
                responseOk.parentNode.removeChild(responseOk);
            }

            submitButton.textContent = 'Submit';
            loadingLayer.classList.remove('loading--active');
        }
    };

    // send the request
    request.send(data);

    return false;
};

export default submitForm;