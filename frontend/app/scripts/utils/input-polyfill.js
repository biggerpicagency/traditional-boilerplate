'use strict';

const placeholderPolyfill = (event) => {
    event.target.classList[event.target.value ? 'add' : 'remove']('filled');
};

const inputLabels = () => {
    if (document.querySelector('input')) {
        var allInputs = document.querySelectorAll('input');
        var allTextareas = document.querySelectorAll('textarea');
        var allSelects = document.querySelectorAll('select');

        [].forEach.call(allInputs, function (singleInput) {
            singleInput.classList[singleInput.value ? 'add' : 'remove']('filled');
            singleInput.addEventListener('change', placeholderPolyfill);
            singleInput.addEventListener('keyup', placeholderPolyfill);
        });

        [].forEach.call(allTextareas, function (singleTextarea) {
            singleTextarea.classList[singleTextarea.value ? 'add' : 'remove']('filled');
            singleTextarea.addEventListener('change', placeholderPolyfill);
            singleTextarea.addEventListener('keyup', placeholderPolyfill);
        });

        [].forEach.call(allSelects, function (singleSelect) {
            singleSelect.classList[singleSelect.value ? 'add' : 'remove']('filled');
            singleSelect.addEventListener('change', placeholderPolyfill);
            singleSelect.addEventListener('keyup', placeholderPolyfill);
        });
    }
};

export default inputLabels;