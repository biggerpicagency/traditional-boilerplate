'use strict';

//import quicklink from 'quicklink/dist/quicklink.mjs';
import 'svgxuse';
import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hash-links-scroll';
import fullHeightViewportCalculation from './utils/full-height';
import eventTracking from './utils/track-event';
import submitForm from './utils/form';
import runMaps from './utils/google-map';
//import animatedSections from './utils/animated-sections';
//import infiniteScroll from './utils/infinite-scroll';
//import magnificPopupInit from './utils/popup';

/* Faster subsequent page-loads by prefetching in-viewport links during idle time */
//quicklink();

/* Register Service Worker */
initServicerWorker();

/* IE Polyfills */
require('./utils/polyfills');

/* Utils */
fullHeightViewportCalculation();
hashLinkScroll();
eventTracking();
runMaps();
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