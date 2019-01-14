'use strict';

import $ from 'jquery';
import screenSize from './screen-size';

const scrollToID = ({id, context = 'html, body', offSet = 80}) => {
    let x = screenSize().x;
    
    if (x < 768) {
        offSet = 60;
    }

    if ($(id).length) {
        let scrollTop = $(id).offset().top - offSet;
        $(context).animate({scrollTop}, 1000);
    }
};

export default scrollToID;