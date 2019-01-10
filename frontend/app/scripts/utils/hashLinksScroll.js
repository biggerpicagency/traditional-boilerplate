'use strict';

import scrollToId from './scrollToId';

const hashLinkScroll = () => {
    console.log(13123445);
    const hashLinks = document.querySelectorAll('a[href^="#"]:not(.js-scroll-to)');
    
    hashLinks.forEach((link) => {
        link.addEventListener('click', function() {
            let target = this.hash;
            let hashValue = target.substr(target.indexOf("#"));

            if (hashValue.length) {
                scrollToId(hashValue);
            }


    
            return false;
        });
    });
};

export default hashLinkScroll;