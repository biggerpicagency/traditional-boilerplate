'use strict';

import animateScrollTo from 'animated-scroll-to';
import screenSize from './screen-size';

const scrollToID = ({id, context = window, offSet = -80}) => {
    let x = screenSize().x;
    let element = document.querySelector(id);
    
    if (x < 768) {
        offSet = -60;
    }

    if (element) {
        animateScrollTo(element, {
            elementToScroll: context,
            verticalOffset: offSet,
            maxDuration: 1000,
            minDuration: 250
        });
    }
};

export default scrollToID;