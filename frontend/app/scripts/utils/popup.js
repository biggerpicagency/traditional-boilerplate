'use strict';

import GLightbox from 'glightbox';

const popup = () => new GLightbox({
    selector: 'js-popup',
    autoplayVideos: true
});

export default popup;