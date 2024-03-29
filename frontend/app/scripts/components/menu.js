'use strict';

var scrollTopPosition = document.body.scrollTop;
const menuScroll = () => {
    var scroll;
    const navbar = document.querySelector('.js-navbar-scroll');

    if (!navbar) {
        return;
    }

    scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    if (scroll >= scrollTopPosition && scrollTopPosition > 100) {
        navbar.classList.add('l-navbar--scrolled');
        document.body.classList.add('page-scrolled');
    } else {
        navbar.classList.remove('l-navbar--scrolled');
        document.body.classList.remove('page-scrolled');
    }

    scrollTopPosition = scroll;
};

// it's just a skeleton of burger click function
const menuBurger = () => {
    const burgerButton = document.querySelector('.js-burger');
    const menuWrapper = document.querySelector('.js-menu-wrapper');

    if (!burgerButton) {
        return; 
    }
    
    burgerButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (menuWrapper.classList.contains('open')) {
            menuWrapper.classList.remove('open');
        } else {
            menuWrapper.classList.add('open');
        }

        return false;
    });
};

export {menuScroll, menuBurger};
