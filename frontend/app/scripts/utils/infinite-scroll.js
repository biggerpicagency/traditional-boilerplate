'use strict';

import 'waypoints/lib/noframework.waypoints.min.js';

const infiniteScroll = (callback) => {
    let infinite;
    const infiniteWrapper = document.querySelector('#js-infinity-wrapper');

    if (infiniteWrapper) {
        infinite = new Waypoint.Infinite({
            element: infiniteWrapper,
            onAfterPageLoad: function() {
                if (callback) {
                    callback();
                }
            }
        });
    }
};

export default infiniteScroll;