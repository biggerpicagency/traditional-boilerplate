'use strict';

// import quicklink from 'quicklink/dist/quicklink.mjs';
import 'svgxuse';
import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hash-links-scroll';
import fullHeightViewportCalculation from './utils/full-height';
import eventTracking from './utils/track-event';
import submitForm from './utils/form';
import executeMaps from './utils/google-map';
import refine, { initRefinement } from './utils/refinement';
// import animatedSections from './utils/animated-sections';
// import infiniteScroll from './utils/infinite-scroll';
// import magnificPopupInit from './utils/popup';
// import inputLabels from './utils/input-polyfill';

/* Faster subsequent page-loads by prefetching in-viewport links during idle time */
// quicklink();

// import {menuScroll, menuBurger} from './components/menu';
// import {refreshLazyLoading, isConfirmPassword} from './components/helpers';

/* Register Service Worker */
initServicerWorker();

/* IE Polyfills */
require('./utils/polyfills');

/* Utils */
fullHeightViewportCalculation();
hashLinkScroll();
eventTracking();
executeMaps();
initRefinement();
// animatedSections();
// magnificPopupInit();
// infiniteScroll({callback: scriptsAsCallback});

/*
 * Your code below
 * 
*/
function runWebsiteScripts() {
    console.log('run your component scripts from runWebsiteScripts() method');
}

/*
 *
 * The scripts within scriptsAsCallback() will be executed dynamically as callback, 
 * for example after infinite scroll load, after content refinement etc.
*/
function scriptsAsCallback() {
    console.log('run scripts as callback');
}

runWebsiteScripts();

// method exposed in the App object
window.App = {
    metaTags: {},
    submitForm,
    refine,
    scriptsAsCallback
};