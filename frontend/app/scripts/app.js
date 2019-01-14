'use strict';

import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hash-links-scroll';
import fullHeightViewportCalculation from './utils/full-height';
import eventTracking from './utils/track-event';
import submitForm from './utils/form';
//import animatedSections from './utils/animated-sections';
//import infiniteScroll from './utils/infinite-scroll';
//import magnificPopupInit from './utils/popup';

/* Register Service Worker */
initServicerWorker();

/* IE Polyfills */
require('./utils/polyfills');

/* Utils */
fullHeightViewportCalculation();
hashLinkScroll();
eventTracking();
//animatedSections();
//magnificPopupInit();
//infiniteScroll();

/*
 * Your code below
 * 
*/
function runWebsiteScripts() {
    console.log('run your component scripts from runWebsiteScripts() method');
}

runWebsiteScripts();

// method exposed in the App object
window.App = {
    submitForm
};