'use strict';

const isMobile = () => {
    try {
        document.createEvent("TouchEvent"); 
        return true; 
    } catch(e) {
        return false;
    }
};

export default isMobile;