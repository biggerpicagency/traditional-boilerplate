'use strict';

const refreshLazyLoading = () => {
    if (window.lazyLoadInstance !== undefined) {
        window.lazyLoadInstance.update();
    }
};

const isConfirmPassword = () => {
    if (document.querySelector('.js-confirm-password')) {
        let password = document.querySelector('.js-password'),
            confirmPassword = document.querySelector('.js-confirm-password');

        password.onchange = validatePassword;
        confirmPassword.onkeyup = validatePassword;

    }
};

const validatePassword = () => {
    if (document.querySelector('.js-confirm-password')) {
        let password = document.querySelector('.js-password'),
            confirmPassword = document.querySelector('.js-confirm-password');

        if (password.value.length > 0 && confirmPassword.value.length > 0) {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords Don't Match");
                confirmPassword.reportValidity();
            } else {
                confirmPassword.setCustomValidity('');
            }
        }
    }
};

export {refreshLazyLoading, isConfirmPassword};
