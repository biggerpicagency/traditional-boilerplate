'use strict';

/**
 * 
 * Infinite Scroll - jquery needed
 * 
 */

var UTILS = UTILS || {};

UTILS.infiniteScroll = function infiniteScroll() {
    let infinite,
        infiniteWrapper = '#js-infinity-wrapper';

    if ($(infiniteWrapper).length) {

        infinite = new Waypoint.Infinite({
            element: $(infiniteWrapper)[0],
            // context is used when we have scroll not on body
            // context: document.querySelector('.l-main')
        });
    }
};
