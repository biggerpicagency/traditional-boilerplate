'use strict';

import scrollToId from './scroll-to-id';

const hashLinkScroll = () => {
    const hashLinks = document.querySelectorAll('a[href^="#"]:not(.js-scroll-to)');
    
    hashLinks.forEach((link) => {
        link.addEventListener('click', function(event) {
            let target = this.hash;
            let hashValue = target.substr(target.indexOf("#"));

            if (hashValue.length) {
                scrollToId({id: hashValue});
            }

            event.preventDefault();
            return false;
        });
    });
};

export default hashLinkScroll;