'use strict';

var scrollTopPosition = $(window).scrollTop();
const menuScroll = () => {
    var scroll;

    if (document.querySelector('.js-navbar-scroll')) {
        scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (document.querySelector('.js-navbar-scroll')) {
            if (scroll >= scrollTopPosition && scrollTopPosition > 100) {
                document.querySelector('.js-navbar-scroll').classList.add('l-navbar--scrolled');
                document.body.classList.add('page-scrolled');
            } else {
                document.querySelector('.js-navbar-scroll').classList.remove('l-navbar--scrolled');
                document.body.classList.remove('page-scrolled');
            }
        }

        scrollTopPosition = scroll;
    }
};

// it's just a skeleton of burgher click function
const menuBurger = () => {
    if (document.querySelector('.js-burger')) {
        const burgerButton = document.querySelector('.js-burger'),
              menuWrapper = document.querySelector('.js-menu-wrapper');
       
        burgerButton.addEventListener('click', function(event) {
            event.preventDefault();

            if (menuWrapper.classList.contains('open')) {
                menuWrapper.classList.remove('open');
            } else {
                menuWrapper.classList.add('open');
            }

            return false;
        });
    }
};


export {menuScroll, menuBurger};
