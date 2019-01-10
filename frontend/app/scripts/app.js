'use strict';

import $ from 'jquery';
import initServicerWorker from './sw/service-worker-registration';
import hashLinkScroll from './utils/hashLinksScroll';
//import magnificPopupInit from './utils/popup';

/* Register Service Worker */
initServicerWorker();

/* Utils */
hashLinkScroll();
//magnificPopupInit();

$('h1').html('Hello from app.js!'); 