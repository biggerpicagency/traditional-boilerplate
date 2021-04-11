'use strict';

// import quicklink from 'quicklink/dist/quicklink.mjs';
import 'svgxuse';

import barba from "@barba/core";
import barbaCss from "@barba/css";

import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hash-links-scroll';
import fullHeightViewportCalculation from './utils/full-height';
import eventTracking, {trackVisit} from './utils/track-event';
import {
    submitForm,
    initValidation,
    resetValidationFormsList,
    initGoogleRecaptcha
} from './utils/form';
import executeMaps from './utils/google-map';
import refine, { initRefinement } from './utils/refinement';
// import animatedSections from './utils/animated-sections';
// import infiniteScroll from './utils/infinite-scroll';
import popup from './utils/popup';
// import inputLabels from './utils/input-polyfill';

/* Faster subsequent page-loads by prefetching in-viewport links during idle time */
// quicklink();

// import {menuScroll, menuBurger} from './components/menu';
// import {refreshLazyLoading, isConfirmPassword} from './components/helpers';

/* Register Service Worker */
initServicerWorker();

/*
 * Your code below
 * 
*/
function runWebsiteScripts(settings = {}) {
    resetValidationFormsList();
    initValidation();
    fullHeightViewportCalculation();
    hashLinkScroll();
    eventTracking();
    executeMaps();
    initRefinement();
    popup();
    // animatedSections();

    initGoogleRecaptcha();
    trackVisit({
        url: window.location.pathname + window.location.search
    });
}

function runBarba() {
    let container = document.querySelector('[data-barba="container"]');

    if (!container) {
        return;
    }
    
    barba.use(barbaCss);
    barba.init();
    
    barba.hooks.before(() => {
        // good place to execute a method responsible for closing mobile menu
    });
    
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });
    
    barba.hooks.after(() => {
        runWebsiteScripts();
    });
}

/*
 *
 * The scripts within scriptsAsCallback() will be executed dynamically as callback, 
 * for example after infinite scroll load, after content refinement etc.
*/
function scriptsAsCallback() {
    console.log('run scripts as callback');
}

runBarba();
runWebsiteScripts({firstTime: true});

// method exposed in the App object
window.App = {
    metaTags: {},
    submitForm,
    refine,
    scriptsAsCallback
};