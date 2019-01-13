'use strict';

import $ from 'jquery';
import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hash-links-scroll';
import fullHeightViewportCalculation from './utils/full-height';
//import magnificPopupInit from './utils/popup';

/* Register Service Worker */
initServicerWorker();

/* IE Polyfills */
require('./utils/polyfills');

/* Utils */
fullHeightViewportCalculation();
hashLinkScroll();
//magnificPopupInit();

/*
 * Your code below
 * 
*/
$('h1').html('Hello from app.js');