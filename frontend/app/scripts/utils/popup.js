'use strict';

import GLightbox from 'glightbox'

const popup = () => {
    const elements = GLightbox({
        selector: 'js-popup',
        autoplayVideos: true
    });
};

export default popup;